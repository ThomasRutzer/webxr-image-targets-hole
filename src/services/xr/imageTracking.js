import { Vector3, Quaternion } from "three"

const onXrSessionStart = async (session) => {
  return session.getTrackedImageScores()
}

const onXrSessionEnd = () => {

}

const onXrFrameUpdate = (frame, referenceSpace) => {
  const trackingResults = frame.getImageTrackingResults()
  
  if (trackingResults.length === 0) return

  const pose = frame.getPose(trackingResults[0].imageSpace, referenceSpace)
  const position = new Vector3()
  const rotation = new Quaternion()

  return {
    emulated: trackingResults[0].trackingState === "emulated",
    measuredWidth: trackingResults[0].measuredWidthInMeters,
    position: position.copy(pose.transform.position),
    rotation: rotation.copy(pose.transform.orientation)
  }
}

export const imageTracking = () => {
  return ({
    onSessionStart: onXrSessionStart,
    onSessionEnd: onXrSessionEnd,
    onFrameUpdate: onXrFrameUpdate,
  })
}