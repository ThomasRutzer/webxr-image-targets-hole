import create from "zustand"

import createUUID from "./utils/createUUID"

const useStore = create(set => ({
  balls: [],
  addBall: () => set(state => ({ balls: [...state.balls, `ball-${createUUID()}`] })),
  removeBall: ballUUID => set(state => ({
    balls: state.balls.filter(currBall => currBall !== ballUUID)
  })),
  isXR: false
}))

export default useStore