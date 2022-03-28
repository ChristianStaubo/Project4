import React, { useEffect, useRef } from 'react';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import { FPVControls } from './FPVControls';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Vector3 } from 'three';
import { useNavigate } from "react-router-dom";

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

  // useEffect(() => {
  //   if (pos.current[1] > 7){
  //     // console.log('Jumping at', pos.current[1])
  //     navigate('/')
  //   }
  // },[pos.current, navigate])
  return (
    <>
      <FPVControls />
      <mesh ref={ref} pos={pos} />
    </>
  );
};


export default Player