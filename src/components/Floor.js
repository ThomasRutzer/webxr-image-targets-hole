import { useFrame, useLoader } from "react-three-fiber"
import React, { Suspense } from "react"

import HoleModel from "./Hole"

const Floor = () => {

  return (
    <Suspense fallback={null}>
      <HoleModel />
    </Suspense>
  )
}

export default Floor