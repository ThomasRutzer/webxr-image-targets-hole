import React, { useRef } from "react"
import { useFrame } from "react-three-fiber"
import { Physics, usePlane, useBox, useSphere } from "@react-three/cannon"
import { Sphere } from "@react-three/drei"

import useXrTrackedImage from "./../useXrTrackedImage"
import Floor from "./Floor"

function Box({ emulated, position, rotation }) {
  const mesh = useRef()

  useFrame(() => {
    if (emulated || !position) {
      mesh.current.visible = false
      return
    }

    if (position && rotation) {
      mesh.current.visible = true

      mesh.current.position.copy(position)
      mesh.current.rotation.copy(rotation)
    }
  })

  return (
    <mesh
      ref={mesh}>
      <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial
        wireframe
        color={"black"} />
    </mesh>
  )
}

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

function Ball(props) {
  const [ref] = useSphere(() => ({ mass: 2, position: [0.01, 5, 0], args: 1, ...props }))
  return (
    <Sphere
      args={[1, 32, 32]}
      ref={ref}>
      <meshBasicMaterial attach="material" color="hotpink" />
    </Sphere>
  )
}

function Scene() {
  const imageTrackingResult = useXrTrackedImage()
  const group = useRef()

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

      console.log(imageTrackingResult);
    }
  })


  return (
    <>

      <Physics>
        <group ref={group}>
          {/* <Floor/> */}
          <Plane />
          {imageTrackingResult &&
            <Ball />
          }
        </group>
      </Physics>


      {/* <Box 
        emulated={imageTrackingResult?.emulated} 
        position={imageTrackingResult?.position} 
        rotation={imageTrackingResult?.rotation} /> */}
    </>
  )
}

export default Scene
