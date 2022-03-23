import React from 'react'
import {Canvas,} from '@react-three/fiber'
//npm i @react-three/drei
import {OrbitControls, Stars,} from '@react-three/drei'
// npm i @react-three/cannon
import {Physics, useBox, usePlane} from '@react-three/cannon'
import Torus from './Torus'
import Player from './Player.js'
import Box from './Box'
import Plane from './Plane'
import { useThree, useFrame } from '@react-three/fiber';
import Snake from './Snake';
// useFrame(() => {
  //   console.log(pos)
  // })
function World() {
  return (
    <Canvas>
     <Physics>
      <Box position={[0,5,0]} color={'hotpink'}/>
      {/* <Box position={[10,3,2]} color={'lightgreen'}/> */}
      {/* <Box position={[5,5,5]} color={'salmon'}/> */}
      {/* <Box/> */}
      <Torus color={'red'} />
      <Player position={[0, 3, 10]} />
      <Plane color={'lightblue'}/>
      </Physics>
      {/* <OrbitControls /> */}
      <Stars />
      <ambientLight intensity={0.5} />
      <spotLight
      position={[10,15,10]}
      angle={0.3}
      />
   </Canvas>
  )
}

export default World