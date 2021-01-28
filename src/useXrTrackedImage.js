import { useXR } from "@react-three/xr"
import { useEffect, useState, useMemo, useRef, useCallback } from "react"
import { useThree, useFrame } from "react-three-fiber"

import { XrImageTracking } from "./services/xr/xrImageTracking"

export const useXrTrackedImage = (image) => {
  const { gl } = useThree()
  const xrImageTracking = useMemo(() => new XrImageTracking(), [])
  const xrFrameRef = useRef()
  const [pose, setPose] = useState()
  const { isPresenting } = useXR()

  const xrUpdate = useCallback((time, xrFrame) => {
    const imageTrackingResult = xrImageTracking.update(xrFrame, gl.xr.getReferenceSpace())
    setPose(imageTrackingResult[0])
    xrFrameRef.current = gl.xr.getSession().requestAnimationFrame(xrUpdate)
  }, [gl.xr, xrImageTracking])

  useEffect(() => {
    xrImageTracking.add(image, 0.1)
    xrImageTracking.prepareImages((err, images) => {
      window.trackedImages = images
    })
  }, [image, xrImageTracking])

  useEffect(() => {
    if (!xrImageTracking.supported) return
    if (!isPresenting) return

    const session = gl.xr.getSession()
    xrImageTracking.onSessionStart(session)
    xrFrameRef.current = session.requestAnimationFrame(xrUpdate)

    return () => {
      xrImageTracking.onSessionEnd()
      session.cancelAnimationFrame(xrFrameRef.current)
      setPose(null)
    }
  }, [gl.xr, isPresenting, xrImageTracking, xrUpdate])

  return pose
}

export default useXrTrackedImage