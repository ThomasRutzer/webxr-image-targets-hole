import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/useGLTF'
import { useTrimesh } from "@react-three/cannon"

export default function Model() {
  const group = useRef()

  const { nodes, materials } = useGLTF('/hole.glb')
  const vertices = nodes.Cube.geometry.attributes.position.array;
  const indices = nodes.Cube.geometry.index.array
  const [ref] = useTrimesh(() => ({
    mass: 0,
    args: [vertices, indices]
  }))

  return (
    <group 
      ref={group} 
     /* scale={[0.07, 0.07, 0.07]} */
      dispose={null}>
      <mesh 
        ref={ref} 
        material={materials.Material} 
        material-opacity={1} 
        material-transparent={false} 
        geometry={nodes.Cube.geometry} />
    </group>
  )
}

useGLTF.preload('/hole.glb')
