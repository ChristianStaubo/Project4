import React, { Suspense } from 'react'
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'
import { Canvas } from '@react-three/fiber';
import './home.css'

import Model from './Fox';
import { OrbitControls } from '@react-three/drei';
function Home() {
    let navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState('')

    // useEffect(() => {
    //     if (currentUser) {
    //         navigate('/world')
    //     }
    // })

    const handleSubmit = (e) => {
      e.preventDefault()
      let user = {currentUser}
      console.log(user)

      fetch('http://localhost:4000/gameHub/gameHub', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("currentUser", currentUser);
          setCurrentUser({
            currentUser
          })
          console.log('Local user =>', currentUser)
          console.log(localStorage)
          navigate('/world')
      };
    })}
  return (
    <>
    <Canvas style={{display:'block', width:'500px', height:'400px', margin:'0 auto', alignItems:'center'}}>
        <Suspense fallback={null}>
        <Model />
        
      </Suspense>
      <OrbitControls/>
      {/* get rid of drag on orbit controls */}
      <ambientLight intensity={0.5} />
      <spotLight
      position={[10,15,10]}
      angle={0.3}
      />
        </Canvas>
    <div id='gamehubHomeDiv'>
        <h1 className='h1'>Welcome to GameHub</h1>
        <p>Choose a username and experience the world of gamehub!</p>
        <form id='usernameForm' onSubmit={handleSubmit}>
          <label style={{display:'inline', paddingRight:'5%'}}>Username</label>
          <input
          type='text'
          required
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value)}
          />
          <button>Submit</button>
        </form>
        
        
        
    </div>
    </>
  )
}

export default Home