import { useEffect, useState, useMemo, useCallback } from "react"
import { useXR } from "@react-three/xr"
import { useThree } from "react-three-fiber"

import { imageTracking } from "../services/xr"
import useXRFrame from "./useXRFrame"

export const useXrTrackedImage = () => {
  const xrDeviceState = useMemo(() => ({
    isSupported: !!window.XRImageTrackingResult
  }), [])
  const xrImageTracking = useMemo(() => imageTracking(), [])
  const [imageTrackingResult, setImageTrackingResult] = useState()
  const { gl } = useThree()
  const { isPresenting } = useXR()

  const xrImageTrackingUpdate = useCallback((time, xrFrame) => {
    const imageTrackingResult = xrImageTracking.onFrameUpdate(xrFrame, gl.xr.getReferenceSpace())
    setImageTrackingResult(imageTrackingResult)
  }, [gl.xr, xrImageTracking])

  useXRFrame(xrImageTrackingUpdate)  

  useEffect(() => {
    if (!xrDeviceState.isSupported || !isPresenting) return

    const session = gl.xr.getSession()

    const checkCanTrack = async () => {
      try {
        await xrImageTracking.onSessionStart(session)
      } catch (err) {
        console.log(err);
      }
    }

    checkCanTrack()

    return () => {
      xrImageTracking.onSessionEnd()
      setImageTrackingResult(null)
    }
  }, [gl.xr, isPresenting, xrImageTracking, xrImageTrackingUpdate, xrDeviceState.isSupported])

  return imageTrackingResult
}

export default useXrTrackedImage