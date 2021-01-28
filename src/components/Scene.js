import React, { useEffect, useRef, useState } from "react"
import { useFrame } from "react-three-fiber"
import { ARCanvas } from "@react-three/xr"

import useXrTrackedImage from "./../useXrTrackedImage"
import track from "./../trackingImages/test.png"
import EnterXRButton from "./EnterXRButton"

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const imageTrackingResult = useXrTrackedImage(props.img)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (imageTrackingResult) {

      const { x: posX, y: posY, z: posZ } = imageTrackingResult.getPosition()
      const { x: rotX, y: rotY, z: rotZ } = imageTrackingResult.getRotation()
      mesh.current.position.x = posX
      mesh.current.position.y = posY
      mesh.current.position.z = posZ

      mesh.current.rotation.x = rotX
      mesh.current.rotation.y = rotY
      mesh.current.rotation.z = rotZ

      console.log(mesh.current.position);
    }
  })

  return (
    <mesh
      {...props}
      ref={mesh}>
      <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  )
}

function Scene() {
  const image = useRef()
  const [trackingImage, setTrackingImage] = useState()

  useEffect(() => {
    if (!image.current) return
    setTrackingImage(image.current)
  }, [image])

  return (
    <>
      <img width="300" height="300" alt="is cool" ref={image} src={track} />
      { trackingImage &&
        <ARCanvas
          sessionInit={{ requiredFeatures: ["image-tracking"] }}
          onCreated={({ gl }) => void document.body.appendChild(EnterXRButton.createButton(gl))}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box img={trackingImage} />
        </ARCanvas>
      }

    </>
  )
}

export default Scene