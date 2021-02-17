import React, { useCallback, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { Physics, usePlane, useBox, useSphere } from "@react-three/cannon"
import { useXR } from "@react-three/xr"
import randomRange from "./../utils/randomRange"

import useStore from "./../store"
import useXrTrackedImage from "./../utils/useXrTrackedImage"
import Floor from "./Floor"
import Ball from "./Ball"
import useXRPose from "../utils/useXRViewerPose"
import useInterval from "../utils/useInterval"
import Box from "./Box"
import Demo from "./Demo"

function Scene() {
  const imageTrackingResult = useXrTrackedImage()
  const group = useRef()
  const store = useStore()

  useInterval(
    () => {
      if (!imageTrackingResult) return

      store.addBall(
        [randomRange(0, 0.5), 10, randomRange(0, 0.5)]
      )
    },
    imageTrackingResult ? 3000 : null
  )

  useFrame(() => {
    if (!group || !group.current) return
    if (!imageTrackingResult || imageTrackingResult?.emulated) {
     // group.current.visible = false
      return
    }

    if (imageTrackingResult.position && imageTrackingResult.rotation) {
   //  group.current.visible = true

      group.current.position.copy(imageTrackingResult.position)
      group.current.rotation.copy(imageTrackingResult.rotation)
    }
  })

  return (
    <>
      <hemisphereLight intensity={0.35} />
      <spotLight position={[30, 0, 30]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize-width={256} shadow-mapSize-height={256} />
      <pointLight position={[-30, 0, -30]} intensity={0.5} />
      <Physics>

        <group
          ref={group}
        >
            <Demo />
          {/* <Box />
                    <Floor /> 


          {store.balls.map((ball, index) => (
            <Ball
              key={`0${index}`}
              startPos={ball.startPos}
            />
          ))} */}
        </group>

      </Physics>
    </>
  )
}

export default Scene
