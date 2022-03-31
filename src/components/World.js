import React, { Suspense, useEffect, useState, useRef } from 'react'
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
import { useSphere } from '@react-three/cannon';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Vector3 } from 'three';
import axios from 'axios'




const torusPos = [10, 10, 10]
const SPEED = 6;


function World() {
  let navigate = useNavigate()
  let [topscores, setTopScores] = useState()
  let [color,setColor] = useState('hotpink')
  let canvasRef = useRef()

  console.log(localStorage.currentUser)
  console.log(Player.position)
  let apple = 'apple'
  useEffect(() => {
    getTopScores()
  },[])
  const getTopScores = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/gameHub/Leaderboard`)
      console.log(res)
      console.log(res.data)
      setTopScores(res.data)
      // sortTopFive()
    }
    catch (err) {
      console.log(err)
    }
  }

  function toggleColor() {
    if (color === 'hotpink') {
      console.log(color)
      setColor('green')
      navigate('/')
    }
    else {
      console.log(color)
      setColor('hotpink')
    }
    
  }
  function handleKeydown(e){
    if (e.keyCode === 49) {
      navigate('/singlePlayerSnake')

    }
    else if (e.keyCode === 50) {
      navigate('/multiplayerSnake')
    }

  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown',handleKeydown)
    }
  },[])

  return (
    <Canvas ref={canvasRef} onKeyDown={handleKeydown} onClick={handleKeydown}>
     <Physics>
      <Box position={[0,5,0]} color={color} scale={1} mass={1} onClick={toggleColor}/>
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