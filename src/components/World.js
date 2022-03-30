import React, { Suspense, useEffect, useState, useRef } from 'react'
import {Canvas,} from '@react-three/fiber'
//npm i @react-three/drei
import {OrbitControls, Stars,} from '@react-three/drei'
// npm i @react-three/cannon
import {Physics, useBox, usePlane} from '@react-three/cannon'
import Torus from './Torus'
// import Player from './Player.js'
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

function Player (props) {
  // let navigate = useNavigate()
  

  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    useKeyboardControls();
    // console.log('forward', moveForward)
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    ...props,
  }));

  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    //keep y velocity same to api's velocity so they don't get all messed up
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  const pos = useRef([0, 0, 0]);
  useEffect(() => api.position.subscribe((v) => (pos.current = v)), []);

  useFrame(() => {
    // console.log(pos.current)
    // [-42,1,-28]
    // console.log(pos.current[0])
    //   if (pos.current[0] > torusPos[0]){
    //       console.log('greater than 1', pos.current[0])
    //   }
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );
    const direction = new Vector3();
    //in front vector, we change the z value
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );
    //in side vector, we change the x value
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );
    //add sub vectors front and side, normalize which will round values to 1 so we can multiply by a scalar quantity easily
    //then apply euler takes the rotation and force and determines how much the force affects the direction based on the offset in rotation in the direction (where am I looking in comparison to the vector force) (math)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    //apply the movement with velocity to our sphere (player person)
    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 8, velocity.current[2]);
    }
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   let user = 'spiderman'
  //   console.log(user)

  //   fetch('http://localhost:4000/gameHub/gameHub', {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(user),
  //     credentials: "include",
  //   })
  //   .then((res) => {
  //     console.log(res);
    
  //       navigate('/')
    
  // })}
  
  useEffect(() => {
    if (pos.current[1] > 7){
      console.log('Jumping at', pos.current[1])
      // navigate('/')
      
    }
  },[pos.current[1]])
  return (
    <>
      <FPVControls />
      <mesh ref={ref} pos={pos} />
    </>
  );
};





































// useFrame(() => {
  //   console.log(pos)
  // })
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
  // useEffect(() => {
  //   console.log(apple)
  //   navigate('/')
  // },[])
  // useEffect(() => {
  //   if (pos.current[1] > 7){
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