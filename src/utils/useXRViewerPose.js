import { useEffect, useState, useMemo, useRef, useCallback } from "react"
import { useXR } from "@react-three/xr"
import { useThree } from "react-three-fiber"

export const useXRViewerPose = () => {
  const xrFrameRef = useRef()
  const { gl } = useThree()
  const { isPresenting } = useXR()
  const [pose, setPose] = useState(null)

  const xrUpdate = useCallback((time, xrFrame) => {
    const session = gl.xr.getSession()
    xrFrameRef.current = session.requestAnimationFrame(xrUpdate)

    setPose(xrFrame.getViewerPose(gl.xr.getReferenceSpace()))
  }, [gl.xr])

  useEffect(() => {
    if (!isPresenting) return
    const session = gl.xr.getSession()
    xrFrameRef.current = session.requestAnimationFrame(xrUpdate)

    return () => {
      session.cancelAnimationFrame(xrFrameRef.current)
      setPose(null)
    }
  }, [gl.xr, isPresenting, xrUpdate])

  return { position: pose?.transform?.position }
}

export default useXRViewerPose
