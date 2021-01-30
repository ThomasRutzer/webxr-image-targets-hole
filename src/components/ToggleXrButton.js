import { forwardRef, useCallback, useEffect, useState } from "react"

const ToggleXrButton = forwardRef(
  ({ activeSession, xrSupported, onSessionStartRequested, onSessionEndRequested },
    ref
  ) => {

    const [label, setLabel] = useState() 

    useEffect(() => {
      if (!xrSupported) {
        setLabel("XR not supported")
        return
      }
      setLabel(activeSession ? "Leave XR" : "Enter XR")
    }, [xrSupported, activeSession])


    const onClick = useCallback(() => {
      if (activeSession) {
        onSessionEndRequested()
      } else {
        onSessionStartRequested()
      }
    }, [activeSession, onSessionStartRequested, onSessionEndRequested])

    return (
      <button
        style={{ position: "absolute" }}
        disabled={!xrSupported}
        onClick={onClick}
        ref={ref}>
        {label}
      </button>
    )
  })

export default ToggleXrButton