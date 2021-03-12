import { usePlane } from "@react-three/cannon"

import useStore from "./../store"

const Collider = () => {
  const store = useStore()
  const [ref] = usePlane(() => (
    { mass: 0, 
      position: [0, -1, 0],
      rotation: [-Math.PI / 2, 0, 0],
      onCollide: e => store.removeBall(e.body.name) 
    }))

  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[5, 5]} />
      <meshStandardMaterial opacity={0} transparent={true} attach="material" color="#171717" />
    </mesh>
  )
}

export default Collider