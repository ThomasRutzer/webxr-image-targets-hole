import React, { useRef, useState } from "react"
import { ARCanvas } from "@react-three/xr"

import useStore from "./../store"
import { trackableImage as createTrackableImage } from "./../services/xr"
import Scene from "./Scene"
import useInterval from "./../utils/useInterval"

function App() {
  const store = useStore()
  const image = useRef()
  const [trackableImage, setTrackableImage] = useState()

  useInterval(
    () => {
      store.addBall()
    },
    store.isXR ? 3000 : null
  )

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
      <div className="intro">
        <section>
          <h1 className="title">WebXR Image Target – Hole 🕳️</h1>
          <img
            className="trackedImage"
            onLoad={() => doCreateTrackableImage()}
            alt="is cool"
            ref={image}
            src={process.env.PUBLIC_URL + "/trackedImage.jpg"} />
        </section>
        <section>
          <ol className="explanation">
            <li>
              <button
                onClick={() => window.print()}>
                Print image
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e2e2e2"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="arcs"
                >
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </button>  10cm x 10cm
            </li>
            <li>Start AR</li>
            <li>Scan image on flat surface</li>
          </ol>

        </section>

        <section>
          <hr />
          <small className="compatibility">
            Currently only available in Chrome for Android &gt;=89, with flag <span className="snippet">chrome://flags#webxr-incubations</span> active
          </small>
          <small className="credit">
            by <a href="https://thomasrutzer@github.io" target="blank">
              Thomas Rutzer
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="arcs"
              >
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
          </small>
        </section>
      </div>

      { trackableImage &&
        <ARCanvas
          style={{ position: "absolute", left: 0, top: 0 }}
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