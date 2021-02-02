import React, { useRef, useState } from "react"
import { useFrame } from "react-three-fiber"
import { ARCanvas } from "@react-three/xr"

import { trackableImage as createTrackableImage } from "./../services/xr"
import useXrTrackedImage from "./../useXrTrackedImage"
import track from "./../trackingImages/test.png"

function Box(props) {
  const mesh = useRef()
  const imageTrackingResult = useXrTrackedImage()

  useFrame(() => {
    if (!imageTrackingResult || imageTrackingResult.emulated) {
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
      <meshStandardMaterial
        wireframe
        color={"black"} />
    </mesh>
  )
}

function Scene() {
  const image = useRef()
  const [trackableImage, setTrackableImage] = useState()

  const doCreateTrackableImage = async () => {
    try {
      const currTrackableImage = await createTrackableImage(image.current, 0.1)
      setTrackableImage(currTrackableImage.image)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <img
        onLoad={() => doCreateTrackableImage()}
        width="300" height="300"
        alt="is cool"
        ref={image}
        src={track} />
      { trackableImage &&
        <ARCanvas
          sessionInit={{
            requiredFeatures: ["image-tracking"],
            trackedImages: [trackableImage]
          }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box />
        </ARCanvas>
      }
    </>
  )
}

export default Scene