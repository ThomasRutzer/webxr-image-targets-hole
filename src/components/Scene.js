import React, { useRef, useState } from "react"
import { useFrame } from "react-three-fiber"
import { ARCanvas } from "@react-three/xr"

import useXrTrackedImage from "./../useXrTrackedImage"
import track from "./../trackingImages/test.png"
import EnterXRButton from "./EnterXRButton"

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const imageTrackingResult = useXrTrackedImage(props.img, 0.1)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if(!imageTrackingResult) return

    if(imageTrackingResult.emulated) {
      mesh.current.visible = false
      return
    }

    if (imageTrackingResult) {
      mesh.current.visible = true

      mesh.current.position.copy(imageTrackingResult.position)
      mesh.current.rotation.copy(imageTrackingResult.rotation)
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

  return (
    <>
      <img onLoad={() => setTrackingImage(image.current)} width="300" height="300" alt="is cool" ref={image} src={track} />
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