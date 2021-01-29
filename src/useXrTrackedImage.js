import { useEffect, useState, useMemo, useRef, useCallback } from "react"
import { useXR } from "@react-three/xr"
import { useThree } from "react-three-fiber"

import { imageTracking, trackableImage as createTrackableImage } from "./services/xr"

export const useXrTrackedImage = (image, imgSizeInMeters) => {
  const xrDeviceState = useMemo(() => ({
    isSupported: !!window.XRImageTrackingResult
  }), [])
  const xrImageTracking = useMemo(() => imageTracking(), [])
  const xrFrameRef = useRef()
  const [currImageTrackingResult, setCurrImageTrackingResult] = useState()
  const [trackableImage, setTrackableImage] = useState()
  const { gl } = useThree()
  const { isPresenting } = useXR()

  const xrImageTrackingUpdate = useCallback((time, xrFrame) => {
    const imageTrackingResult = xrImageTracking.onFrameUpdate(xrFrame, gl.xr.getReferenceSpace())
    setCurrImageTrackingResult(imageTrackingResult)
    xrFrameRef.current = gl.xr.getSession().requestAnimationFrame(xrImageTrackingUpdate)
  }, [gl.xr, xrImageTracking])

  useEffect(() => {
    const doCreateTrackableImage = async () => {
      try {
        const currTrackableImage = await createTrackableImage(image, imgSizeInMeters)
        setTrackableImage(currTrackableImage)
        window.trackedImages = [currTrackableImage.image]
      } catch (err) {
        console.log(err);
      }
    }

    doCreateTrackableImage()

    return () => trackableImage ? trackableImage.destroy() : null
  }, [image, imgSizeInMeters, xrImageTracking, trackableImage])

  useEffect(() => {
    if (!xrDeviceState.isSupported || !isPresenting) return

    const session = gl.xr.getSession()

    const checkCanTrack = async () => {
      try {
        await xrImageTracking.onSessionStart(session)
        xrFrameRef.current = session.requestAnimationFrame(xrImageTrackingUpdate)
      } catch (err) {
        console.log(err);
      }
    }

    checkCanTrack()

    return () => {
      xrImageTracking.onSessionEnd()
      session.cancelAnimationFrame(xrFrameRef.current)
      setCurrImageTrackingResult(null)
    }
  }, [gl.xr, isPresenting, xrImageTracking, xrImageTrackingUpdate, xrDeviceState.isSupported])

  return currImageTrackingResult
}

export default useXrTrackedImage