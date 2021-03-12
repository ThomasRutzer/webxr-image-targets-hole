import React, { useEffect, useRef } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { Physics } from "@react-three/cannon"
import { useTransition } from "@react-spring/three"

import useStore from "./../store"
import useXrTrackedImage from "../utils/useXRTrackedImage"
import Collider from "./Collider"
import Bowl from "./Bowl"
import Ball from "./Ball"
import randomRange from "./../utils/randomRange"

function Scene() {
  const imageTrackingResult = useXrTrackedImage()
  const group = useRef()
  const balls = useStore(s => s.balls)
  const { gl } = useThree()

  const [transitions] = useTransition(
    balls,
    {
      keys: item => item,
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 }
    },
    [balls.length]
  )

  useEffect(() => {
    useStore.setState({ isXR: gl.xr.isPresenting})
  }, [gl.xr.isPresenting])

useFrame(() => {
  if (!group.current) return

  if (!gl.xr.isPresenting || imageTrackingResult?.emulated) {
    group.current.visible = false
    return
  }

  if (imageTrackingResult) {
    group.current.visible = true

    group.current.position.copy(imageTrackingResult.position)
    group.current.rotation.copy(imageTrackingResult.rotation)
  }
})

return (
  <>
    <hemisphereLight intensity={0.35} />
    <Physics>
      <group ref={group}>
        <ambientLight intensity={1.5} />
        <pointLight position={[100, 100, 100]} intensity={2} castShadow />
        <pointLight position={[-100, -100, -100]} intensity={5} color="#262424" />
        <group
          scale={[0.05, 0.05, 0.05]}
        >
          <Collider />
          <Bowl />
          {transitions((props, item, key) => (
            <Ball
              {...item}
              {...props}
              name={item}
              startPos={[randomRange(-0.5, 0.5), 9, randomRange(-0.5, 0.5)]}
            />
          ))}
        </group>
      </group>
    </Physics>
  </>
)
}

export default Scene
