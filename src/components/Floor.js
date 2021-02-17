import { useFrame, useLoader } from "react-three-fiber"
import React, { Suspense } from "react"

import HoleModel from "./Hole"

const Floor = (props) => {

  return (
    <Suspense fallback={null}>
      <HoleModel {...props} />
    </Suspense>
  )
}

export default Floor