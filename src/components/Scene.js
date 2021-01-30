import React, { useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { ARCanvas, useXR } from "@react-three/xr"

import useStore from "./../store"
import useXrTrackedImage from "./../useXrTrackedImage"
import track from "./../trackingImages/test.png"
import EnterXRButton from "./EnterXRButton"
import ToggleXrButton from "./ToggleXrButton"

function Box(props) {
  const store = useStore()
  const mesh = useRef()
  const { imageTrackingResult, trackableImage } = useXrTrackedImage(props.img, 0.1)

  useEffect(() => {
    if(!trackableImage) return
    store.trackableImages = [trackableImage]
  }, [store, trackableImage])

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
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  )
}

function Scene() {
  const store = useStore()
  const [gl, setGl] = useState()
  const xrDomOverlay = useRef()
  const image = useRef()
  const [trackingImage, setTrackingImage] = useState()
  const [xrSupported, setXrSupported] = useState()

  const doStartXrSession = async () => {
    console.log(store);
    const sessionInit = {
      optionalFeatures: ["dom-overlay", "image-tracking"],
      //domOverlay: { root: xrDomOverlay.current },
      trackedImages: store.trackableImages
    }

    if (!gl.xr.isPresenting) {
      navigator.xr.requestSession(
        "immersive-ar",
        sessionInit
      ).then(session => {
        session.addEventListener("end", doStopXrSession)

        gl.xr.setReferenceSpaceType("local")
        gl.xr.setSession(session)

        // sessionInit.domOverlay.root.style.display = ""
      })

    } else {
      gl.xr.getSession().end()
    }
  }

  const doStopXrSession = () => {
    gl.xr.getSession().removeEventListener("end", doStopXrSession)

    // sessionInit.domOverlay.root.style.display = "none"
  }

  useEffect(() => {
    const checkXrSupported = async () => {
      if ("xr" in navigator) {
        navigator.xr.isSessionSupported("immersive-ar").then(function (supported) {
          setXrSupported(supported)
        }).catch(err => {
          setXrSupported(false)
        })
      } else {
        setXrSupported(false)
      }
    }

    checkXrSupported()
  }, [])

  return (
    <>
      <img onLoad={() => setTrackingImage(image.current)} width="300" height="300" alt="is cool" ref={image} src={track} />
      <ToggleXrButton
        activeSession={gl?.xr?.isPresenting}
        xrSupported={xrSupported}
        onSessionEndRequested={doStopXrSession}
        onSessionStartRequested={doStartXrSession}
        ref={xrDomOverlay} />
      { trackingImage &&
        <ARCanvas
          onCreated={({ gl }) => setGl(gl)}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box img={trackingImage} />
        </ARCanvas>
      }
    </>
  )
}

export default Scene