import React, { useRef, useState } from "react"
import { ARCanvas } from "@react-three/xr"
import { trackableImage as createTrackableImage } from "./../services/xr"

import trackingImageAsset from "./../trackingImages/test.png"
import Scene from "./Scene"

function App() {
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
        src={trackingImageAsset} />
      { trackableImage &&
        <ARCanvas
          sessionInit={{
            requiredFeatures: ["image-tracking"],
            trackedImages: [trackableImage]
          }}>
          <Scene />
        </ARCanvas>
      }
    </>
  )
}

export default App