import { useTrimesh } from "@react-three/cannon"
import { useGLTF } from "@react-three/drei"

const Bowl = (props) => {
  const { nodes } = useGLTF(`${process.env.PUBLIC_URL}/hole.glb`)
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
      receiveShadow
      {...props}>
      <meshStandardMaterial opacity={0} transparent={true} />
    </mesh>
  )
}

export default Bowl