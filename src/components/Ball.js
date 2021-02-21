import { TextureLoader, RepeatWrapping, VertexColors } from "three"
import { useLoader } from "react-three-fiber"
import { useSphere } from "@react-three/cannon"

const Ball = ({ name, startPos }) => {
  const map = useLoader(TextureLoader, '/ballMaterial.jpg')
  const [ref] = useSphere(() => ({ mass: 1, position: startPos, args: 0.1 }))

  return (
    <mesh
      castShadow 
      name={name}
      ref={ref}>
      <sphereBufferGeometry attach="geometry" args={[0.1, 64, 64]} />
      <meshPhongMaterial
        attach="material"
        vertexColors={VertexColors}
        normalMap={map}
        normalScale={[1, 1]}
        normalMap-wrapS={RepeatWrapping}
        normalMap-wrapT={RepeatWrapping}
        normalMap-repeat={[10, 10]}
      />
    </mesh>
  )
}

export default Ball