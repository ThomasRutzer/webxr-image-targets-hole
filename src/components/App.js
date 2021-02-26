import React, { useRef, useState } from "react"
import { ARCanvas } from "@react-three/xr"

import { trackableImage as createTrackableImage } from "./../services/xr"
import Scene from "./Scene"

function App() {
  const image = useRef()
  const [trackableImage, setTrackableImage] = useState()

  const doCreateTrackableImage = async () => {
    try {
      const currTrackableImage = await createTrackableImage(image.current, 0.12)
      setTrackableImage(currTrackableImage.image)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="intro">
        <h1 className="title">WebXR Image Target – Hole 🕳️</h1>
        <img
          className="trackedImage"
          onLoad={() => doCreateTrackableImage()}
          width="300"
          height="300"
          alt="is cool"
          ref={image}
          src={process.env.PUBLIC_URL + "/trackedImage.jpg"} />
        <ol className="explanation">
          <li><button onClick={() => window.print()}>Print image</button>  10cm X 10cm</li>
          <li>Start AR</li>
          <li>Scan image on flat surface</li>
          <li>Currently only available in Chrome for Android &gt;=89, with flag <span className="snippet">chrome://flags#webxr-incubations</span> active</li>
        </ol>
      </div>

      { trackableImage &&
        <ARCanvas
          style={{ position: "absolute", left: 0, top: 0 }}
          camera={{ position: [5, 10, 0] }}
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