import React, { Suspense, useEffect, useState } from 'react'
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
import Model from './Fox'
import SnakeTitleBoard from './SnakeTitleBoard'
import axios from 'axios'

// useFrame(() => {
  //   console.log(pos)
  // })
function World() {
  let navigate = useNavigate()
  let [topscores, setTopScores] = useState()

  console.log(localStorage.currentUser)
  console.log(Player.position)
  let apple = 'apple'
  useEffect(() => {
    getTopScores()
  },[])
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

  

  // function navigateToSinglePlayerSnake() {
  //   navigate('/')
   
  // }

  const getTopScores = async () => {
    try {
      const res = await axios.get('http://localhost:4000/gameHub/Leaderboard')
      console.log(res)
      console.log(res.data)
      setTopScores(res.data)
      // sortTopFive()
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <Canvas>
     <Physics>
      <Box position={[0,5,0]} color={'hotpink'} scale={1} mass={1}/>
      {/* <Box position={[26, 1, -23]} color={'lightgreen'} scale={2} mass={1}/> */}
      {/* <Box position={[5,5,5]} color={'salmon'}/> */}
      {/* <Box/> */}
      
      <Torus color={'red'} position={[35, 1, -23]} />
      {/* <SnakeTitleBoard position={[35, 1, -23]} text={'hello'} /> */}
      <Torus color={'blue'} position={[-42,1,-28]} />
      {/* <SnakeTitleBoard position={[-42,1,-28]} text={'hello'} /> */}
      {/* navigate={navigate} */}
      <Player position={[0, 3, 10]}   />
      <Leaderboard topscores={topscores} />
      <Plane color={'cyan'}/>
      </Physics>
      {/* <Suspense fallback={null}>
        <Model />
      </Suspense> */}
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