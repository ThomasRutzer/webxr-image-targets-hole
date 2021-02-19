import create from "zustand"

const useStore = create(set => ({
  balls: [],
  addBall: () => set(state => ({ balls: [...state.balls, true] })),
  removeBall: (index) => set(state => {
    const ball = state.balls.indexOf(index)
    return { balls: ball > -1 ? state.balls.splice(ball, 1) : state.balls }
  })
}))

export default useStore