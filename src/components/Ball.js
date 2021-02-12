import { Sphere } from "@react-three/drei"
import { Physics, usePlane, useBox, useSphere } from "@react-three/cannon"

const Ball = ({ startPos = [0, 5, 0] }) => {
  const [ref] = useSphere(() => ({ mass: 2, position: startPos, args: 0.3 }))

  return (
    <Sphere
      args={[0.3, 16, 16]}
      ref={ref}>
      <meshBasicMaterial attach="material" color="hotpink" />
    </Sphere>
  )
}

export default Ball