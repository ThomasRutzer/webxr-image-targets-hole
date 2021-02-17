import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei/useGLTF'
import { useTrimesh, useConvexPolyhedron } from "@react-three/cannon"
import { useFrame } from 'react-three-fiber'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'
export default function Model(props) {
  const { nodes, materials } = useGLTF('/hole.glb')
  const vertices = nodes.Cube.geometry.attributes.position.array;
  const indices = nodes.Cube.geometry.index.array
  // const [ref, api] = useTrimesh(() => ({
  //   mass: 0,
  //   args: [vertices, indices]
  // }))

  const geo = useMemo(() => {
    const g = new THREE.Geometry().fromBufferGeometry(nodes.Cube.geometry)
    // Merge duplicate vertices resulting from glTF export.
    // Cannon assumes contiguous, closed meshes to work
    g.mergeVertices()
    // Ensure loaded mesh is convex and create faces if necessary
    return new ConvexGeometry(g.vertices)
  }, [nodes])

  const [ref, api] = useConvexPolyhedron(() => ({ mass: 0, args: geo }));


  useFrame(() => {

    if (props.position) {
      api.position.set(props.position.x, props.position.y, props.position.z)
      // group.current.rotation.copy(props.rotation)
    }

    if (props.rotation) {
      api.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z)
      //  group.current.position.copy(props.position)
    }
  })

  return (
    <group
      ref={ref}
      //scale={[0.07, 0.07, 0.07]}
      dispose={null}>
      <mesh
        material={materials.Material}
        material-opacity={1}
        material-transparent={false}
        geometry={nodes.Cube.geometry} />
    </group>
  )
}

