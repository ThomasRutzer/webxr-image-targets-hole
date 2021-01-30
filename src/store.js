import create from "zustand"

const useStore = create(() => ({
  trackableImages: []
}))

export default useStore