import create from "zustand"

const useStore = create(set => ({
  balls: [],
  addBall: (startPos) => set((state) => {
    console.log(startPos);
    return { balls: [...state.balls, { startPos }] }
  })
}))

export default useStore