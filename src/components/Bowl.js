import { useTrimesh } from "@react-three/cannon"
import { useGLTF } from "@react-three/drei"

const Bowl = (props) => {
  const { nodes } = useGLTF("./hole.glb")
  const geometry = nodes.Cube.geometry
  const vertices = geometry.attributes.position.array
  const indices = geometry.index.array

  const [ref] = useTrimesh(() => ({
    mass: 0,
    rotation: props.rotation,
    args: [vertices, indices],
  }))

  return (
    <mesh
      ref={ref}
      geometry={nodes.Cube.geometry}
      {...props}>
      <meshStandardMaterial opacity={1} transparent={true} />
    </mesh>
  )
}

export default Bowl