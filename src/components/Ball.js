import { useSphere } from "@react-three/cannon"
import { a } from "@react-spring/three"

const Ball = ({ name, startPos, opacity }) => {
  const [ref] = useSphere(() => ({ mass: 0.5, position: startPos, args: 0.1 }))

  return (
    <a.mesh
     receiveShadow
      castShadow 
      name={name}
      ref={ref}>
      <sphereBufferGeometry attach="geometry" args={[0.1, 64, 64]} />
      <a.meshStandardMaterial
        transparent
        opacity={opacity}
        attach="material"
        color={"#CF94AF"}
      />
    </a.mesh>
  )
}

export default Ball