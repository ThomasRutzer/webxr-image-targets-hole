import React, { useCallback, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { Physics, usePlane, useBox, useSphere } from "@react-three/cannon"
import { useXR } from "@react-three/xr"

import useStore from "./../store"
import useXrTrackedImage from "./../utils/useXrTrackedImage"
import Floor from "./Floor"
import Ball from "./Ball"
import useXRPose from "../utils/useXRViewerPose"
import useInterval from "../utils/useInterval"

function Plane(props) {
  const [ref] = usePlane(() => ({ type: "Kinematic", rotation: [0, 0, 0], ...props }))

  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial
        wireframe
        color={"black"} />
    </mesh>
  )
}

function Scene() {
  const imageTrackingResult = useXrTrackedImage()
  const { position } = useXRPose()
  const group = useRef()
  const store = useStore()
  const { isPresenting } = useXR()

  useInterval(
    () => {
      if (!position) return

      store.addBall(
        [position.x, position.y, position.z]
      )
    },
    !isPresenting ? null : 3000
  )

  useFrame(() => {
    if (!imageTrackingResult) return
    if (imageTrackingResult && imageTrackingResult.emulated) {
      group.current.visible = false
      return
    }

    if (imageTrackingResult.position && imageTrackingResult.rotation) {
      group.current.visible = true

      group.current.position.copy(imageTrackingResult.position)
      group.current.rotation.copy(imageTrackingResult.rotation)
    }
  })

  return (
    <>
      <Physics>
        <group ref={group}>
          {/* <Floor /> */}
          {/* <Plane /> */}
          {store.balls.map((ball, index) => (
            <Ball
              key={`0${index}`}
              startPos={ball.startPos}
            />
          ))}
        </group>
      </Physics>
    </>
  )
}

export default Scene
