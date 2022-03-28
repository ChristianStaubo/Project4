import React, { useEffect } from 'react'
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
import Leaderboard from './Leaderboard'
import './world.css'
import { FPVControls } from './FPVControls'
import { Navigate, useNavigate } from "react-router-dom";

// useFrame(() => {
  //   console.log(pos)
  // })
function World() {
  let navigate = useNavigate()

  console.log(localStorage.currentUser)
  console.log(Player.position)
  let apple = 'apple'

  // useEffect(() => {
  //   console.log(apple)
  //   navigate('/')
  // },[])
  // useEffect(() => {
  //   if (pos.current[1] > 7){
  //     // console.log('Jumping at', pos.current[1])
  //     navigate('/')
  //   }
  // },[pos.current, navigate])
  return (
    <Canvas>
     <Physics>
      <Box position={[0,5,0]} color={'hotpink'}/>
      {/* <Box position={[10,3,2]} color={'lightgreen'}/> */}
      {/* <Box position={[5,5,5]} color={'salmon'}/> */}
      {/* <Box/> */}
      <Torus color={'red'} />
      <Player position={[0, 3, 10]} />
      <Leaderboard />
      <Plane color={'cyan'}/>
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