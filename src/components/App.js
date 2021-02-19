import React, { useRef, useState } from "react"
import { ARCanvas } from "@react-three/xr"
import { trackableImage as createTrackableImage } from "./../services/xr"

import useStore from "./../store"
import Scene from "./Scene"
import useInterval from "./../utils/useInterval"

function App() {
  const image = useRef()
  const [trackableImage, setTrackableImage] = useState()
  const store = useStore()

  useInterval(
    () => {
      // if (!imageTrackingResult) return
      store.addBall()
    },
    3000
  )

  const doCreateTrackableImage = async () => {
    try {
      const currTrackableImage = await createTrackableImage(image.current, 0.135)
      setTrackableImage(currTrackableImage.image)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/* <div className="intro">
        <img
          className="trackedImage"
          onLoad={() => doCreateTrackableImage()}
          width="300"
          height="300"
          alt="is cool"
          ref={image}
          src={process.env.PUBLIC_URL + "/trackedImage.png"} />
        <ol className="explanation">
          <li>Currently only available in Chrome for Android &gt;=89, with flag <span className="snippet">chrome://flags#webxr-incubations</span> active</li>
          <li><button onClick={() => window.print()}>Print image</button> (or view on a 2<sup>nd</sup> device)</li>
          <li>Start AR</li>
          <li>Scan image on flat surface</li>
        </ol>
      </div>

      { trackableImage && */}
        <ARCanvas
          style={{ position: "absolute", left: 0, top: 0 }}
          camera={{ position: [5, 10, 0] }}
          sessionInit={{
            requiredFeatures: ["image-tracking"],
            trackedImages: [trackableImage]
          }}>
          <Scene />
        </ARCanvas>
      {/* } */}
    </>
  )
}

export default App