import { useEffect, useState, useMemo, useRef, useCallback } from "react"
import { useXR } from "@react-three/xr"
import { useThree } from "react-three-fiber"

import { imageTracking } from "./services/xr"

export const useXrTrackedImage = () => {
  const xrDeviceState = useMemo(() => ({
    isSupported: !!window.XRImageTrackingResult
  }), [])
  const xrImageTracking = useMemo(() => imageTracking(), [])
  const xrFrameRef = useRef()
  const [imageTrackingResult, setImageTrackingResult] = useState()
  const { gl } = useThree()
  const { isPresenting } = useXR()

  const xrImageTrackingUpdate = useCallback((time, xrFrame) => {
    const imageTrackingResult = xrImageTracking.onFrameUpdate(xrFrame, gl.xr.getReferenceSpace())
    setImageTrackingResult(imageTrackingResult)
    xrFrameRef.current = gl.xr.getSession().requestAnimationFrame(xrImageTrackingUpdate)
  }, [gl.xr, xrImageTracking])

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
      setImageTrackingResult(null)
    }
  }, [gl.xr, isPresenting, xrImageTracking, xrImageTrackingUpdate, xrDeviceState.isSupported])

  return imageTrackingResult
}

export default useXrTrackedImage