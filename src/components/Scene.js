import React, { useRef } from "react"
import { useFrame } from "react-three-fiber"
import { ARCanvas } from '@react-three/xr'

import useXrTrackedImage from "./../useXrTrackedImage"
import trackingImage from "./../trackingImages/test.png"
import EnterXRButton from "./EnterXRButton"

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const trackedImages = useXrTrackedImage(props.img.current)
  window.trackedImages = trackedImages

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <mesh
      {...props}
      ref={mesh}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  )
}

function Scene() {
  const image = useRef()

  return (
    <>
      <img alt="is cool" ref={image} src={trackingImage} />
      <ARCanvas onCreated={({ gl }) => void document.body.appendChild(EnterXRButton.createButton(gl))}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box img={image} position={[0, 2, -4]} />
      </ARCanvas>
    </>
  )
}

export default Scene