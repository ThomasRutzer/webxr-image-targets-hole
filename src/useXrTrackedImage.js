import { useXR } from "@react-three/xr"
import { useEffect, useState, useMemo, useRef, useCallback } from "react"
import { useThree, useFrame } from "react-three-fiber"

import { XrImageTracking } from "./services/xr/xrImageTracking"

export const useXrTrackedImage = (image) => {
  const { gl } = useThree()
  const xrImageTracking = useMemo(() => new XrImageTracking(), [])
  const xrFrameRef = useRef()
  const [trackedImages, setTrackedImages] = useState()

  const xrUpdate = useCallback((time, xrFrame) => {
    xrImageTracking.update(xrFrame)
    xrFrameRef.current = gl.xr.getSession().requestAnimationFrame(xrUpdate)
  }, [gl.xr, xrImageTracking])

  useEffect(() => {
    xrImageTracking.add(image, 0.1)
    xrImageTracking.prepareImages((err, images) => {
      console.log(err);
      setTrackedImages(images)
    })
  }, [image, xrImageTracking])

  useEffect(() => {
    if (!xrImageTracking.supported) return
    if (!gl.xr.isPresenting) return

    const session = gl.xr.getSession()
    xrImageTracking.onSessionStart(session)
    xrFrameRef.current = session.requestAnimationFrame(xrUpdate)

    return () => {
      xrImageTracking.onSessionEnd()
      session.cancelAnimationFrame(xrFrameRef.current)
    }
  }, [gl.xr, gl.xr.isPresenting, xrImageTracking, xrUpdate])

  return trackedImages
}

export default useXrTrackedImage