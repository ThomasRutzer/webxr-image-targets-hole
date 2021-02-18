import { useCallback, useEffect, useRef } from "react"
import { useThree } from "react-three-fiber"

const useXRFrame = callback => {
  const { gl } = useThree()
  const requestRef = useRef()
  const previousTimeRef = useRef()

  const loop = useCallback((time, xrFrame) => {
    if (previousTimeRef.current !== undefined) {
      callback(time, xrFrame)
    }

    previousTimeRef.current = time
    requestRef.current = gl.xr.getSession().requestAnimationFrame(loop)
  }, [gl.xr, callback])

  useEffect(() => {
    if (!gl.xr?.isPresenting && !requestRef.current) {
      return
    }

    requestRef.current = gl.xr.getSession().requestAnimationFrame(loop)

    return () => {
      gl.xr.getSession().cancelAnimationFrame(loop)
    }
  }, [gl, gl.xr.isPresenting, loop])
}

export default useXRFrame