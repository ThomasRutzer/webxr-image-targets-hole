import { TextureLoader } from "three"
import { useLoader } from "react-three-fiber"
import { useSphere } from "@react-three/cannon"
import { a } from '@react-spring/three'

const Ball = ({ name, startPos, opacity }) => {
  const map = useLoader(TextureLoader, '/ballMaterial.jpg')
  const [ref] = useSphere(() => ({ mass: 1, position: startPos, args: 0.1 }))

  return (
    <a.mesh
     receiveShadow
      castShadow 
      name={name}
      ref={ref}>
      <sphereBufferGeometry attach="geometry" args={[0.1, 64, 64]} />
      <a.meshBasicMaterial
        transparent
        opacity={opacity}
        attach="material"
        map={map}
      />
    </a.mesh>
  )
}

export default Ball