import { renderHook } from "@testing-library/react-hooks"
import { useThree } from "react-three-fiber"

import useXRFrame from "./useXRFrame"

jest.mock("react-three-fiber", () => {
    let mockXRFrame = { getPose: jest.fn(), getViewerPose: jest.fn() }
    const frameRate = 60
    const callTime = Math.round(1000 / frameRate)
    const mockGl = {
      xr: {
        isPresenting: false,
        getSession: () => ({
          requestAnimationFrame: (cb) => setInterval(() => {
            cb(callTime, mockXRFrame)
          }, callTime)
        })
      }
    }

    return {
      useThree: () => ({ gl: mockGl })
    }
  }
)

describe("useXRFrame", () => {

  beforeEach(() => jest.clearAllMocks())

  test("is not called when xr.isPresenting=false", () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useXRFrame(callback))

    console.log(result.current);
    expect(callback).not.toHaveBeenCalled()
  })
})

