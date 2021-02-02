import React, { useRef } from "react"
import { useFrame } from "react-three-fiber"
import { Physics, usePlane, useBox } from "@react-three/cannon"

import useXrTrackedImage from "./../useXrTrackedImage"

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
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
    </mesh>
  )
}

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }))
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" />
    </mesh>
  )
}

function Scene() {
  const imageTrackingResult = useXrTrackedImage()

  return (
    <>
      <Physics>
        <Plane />
        <Cube />
      </Physics>
      {/* <Box 
        emulated={imageTrackingResult?.emulated} 
        position={imageTrackingResult?.position} 
        rotation={imageTrackingResult?.rotation} /> */}
    </>
  )
}

export default Scene