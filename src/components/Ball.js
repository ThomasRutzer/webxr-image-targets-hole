import { Sphere } from "@react-three/drei"
import { Physics, usePlane, useBox, useSphere } from "@react-three/cannon"

const Ball = ({ startPos }) => {
  console.log(startPos);

  const [ref] = useSphere(() => ({ mass: 1, position: startPos, args: 0.02 }))

  return (
    <mesh castShadow ref={ref}>
      <sphereBufferGeometry attach="geometry" args={[0.02, 64, 64]} />
      <meshBasicMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

export default Ball