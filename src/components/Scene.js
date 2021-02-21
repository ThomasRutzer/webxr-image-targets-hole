import React, { useRef } from "react"
import { useFrame } from "react-three-fiber"
import { Physics } from "@react-three/cannon"

import useStore from "./../store"
import useXrTrackedImage from "./../utils/useXrTrackedImage"

import Collider from "./Collider"
import Bowl from "./Bowl"
import Ball from "./Ball"
import randomRange from "./../utils/randomRange"


function Scene() {
  const imageTrackingResult = useXrTrackedImage()
  const group = useRef()
  const balls = useStore(s => s.balls)

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
      <Physics>
        <group ref={group}>
          <spotLight
            position={[30, 0, 30]}
            angle={0.3} 
            penumbra={1}
            intensity={2} 
            castShadow
            shadow-mapSize-width={256}
            shadow-mapSize-height={256} />
          <pointLight position={[-30, 0, -30]} intensity={0.5} />
          <group
            // scale={[0.07, 0.07, 0.07]}
          >
            <Collider />
            <Bowl rotation={[0, 0, 0]} />
            {balls.map((ball) => (
              <Ball
                key={ball}
                name={ball}
                startPos={[randomRange(), 9, randomRange()]}
              />
            ))}
          </group>
        </group>
      </Physics>
    </>
  )
}

export default Scene
