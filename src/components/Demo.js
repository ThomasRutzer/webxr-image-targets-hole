import React, { useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { Physics, useSphere, useTrimesh } from '@react-three/cannon'
import { OrbitControls, TorusKnot, useGLTF } from '@react-three/drei'
import useInterval from "./../utils/useInterval"
import useStore from "./../store"

const WeirdCheerio = (props) => {
  const [ref] = useSphere(() => ({ mass: 1, args: props.radius, ...props }))

  return (
    <TorusKnot ref={ref} args={[props.radius, props.radius / 2]}>
      <meshNormalMaterial />
    </TorusKnot>
  )
}

const Bowl = (props) => {
  const { nodes } = useGLTF('./hole.glb')
  const geometry = nodes.Cube.geometry
  const vertices = geometry.attributes.position.array
  const indices = geometry.index.array

  const [hovered, setHover] = useState(false)

  const [ref] = useTrimesh(() => ({
    mass: 0,
    rotation: props.rotation,
    args: [vertices, indices],
  }))

  return (
    <mesh
      ref={ref}
      geometry={nodes.Cube.geometry}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)} material-opacity={0}
      material-transparent={true} 

      {...props}>
      <meshStandardMaterial color={'white'} wireframe={hovered} />
    </mesh>
  )
}
/* eslint-disable */
export default () => {
  const balls = useStore(s => s.balls)

  return (
    <group scale={[0.07, 0.07, 0.07]} >
      <Bowl rotation={[0, 0, 0]} />
      {balls.map((ball, index) => (
        <WeirdCheerio key={`0${index}`} radius={0.1} position={[randomRange(), 9, randomRange()]} />
        // <Ball
        //   key={`0${index}`}
        //   startPos={ball.startPos}
        // />
      ))}
    </group>
  )
}