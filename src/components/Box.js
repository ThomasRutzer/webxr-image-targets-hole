import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon"
import * as THREE from "three"

function Plane({ color, ...props }) {
  const [ref] = usePlane(() => ({ ...props }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[0.2, 0.2]} />
      <meshPhongMaterial attach="material" color={color} side={THREE.DoubleSide} />
    </mesh>
  )
}

const Box = () => {
  return (
    <group>
     {/* <Plane color={"black"} position={[0, 0, 0.2]} rotation={[0, 0, 0]} />
       <Plane color={"green"} position={[0, 0, 0.1]} rotation={[0, Math.PI / 2, 0]} />
      <Plane color={"yellow"} position={[0.1, 0, 0.1]} rotation={[0, -Math.PI / 2, 0]} />
      <Plane color={"blue"} position={[0, 0, 0.2]} rotation={[0, 0, 0]} /> */}
      <Plane color={"red"} position={[0, -0.1, 0.1]} rotation={[-Math.PI / 2, 0, 0]} />
      {/* <Plane color={"red"} />
      <Plane color={"hotpink"} position={[-8, 0, 8]} rotation={[0, Math.PI / 2, 0]} />
      <Plane color={"green"} position={[8, 0, 8]} rotation={[0, Math.PI / 2, 0]} />
      <Plane color={"blue"} position={[0, -2, 2]} rotation={[Math.PI / 2, 0, 0]} />
      <Plane color={"lightgrey"} position={[0, 0, 2]} rotation={[0, 0, 0]} /> */}

    </group>
  )
}

export default Box