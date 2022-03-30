import React, { Suspense } from 'react'
import { useNavigate } from "react-router-dom";
import {useState, useEffect, useRef} from 'react'
import { Canvas } from '@react-three/fiber';
import './home.css'

// import Model from './Fox';
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import { Button, Fab, IconButton, TextField,} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import NavigationIcon from '@mui/icons-material/Navigation';

// import {NavigationIcon} from '@mui/icons-material'

function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/fox.gltf')
  const { actions } = useAnimations(animations, group)
  let [isRunning,setIsRunning] = useState(false)
  useEffect(() => {
    console.log(actions)
    console.log(group)
    actions.Run.play()
    // actions.Survey.play()
    // actions.Walk.play()
    
  })
  useFrame(() => {
    group.current.rotation.y += 0.01
  })
//   scale={0.01}
  function toggleRun() {
      isRunning = !isRunning
      console.log(isRunning)
      console.log('I am ', actions)
      if (isRunning) {
          actions.Run.stop()
          actions.Survey.play()
      }
      else {
          actions.Survey.stop()
          actions.Run.play()
      }
  }
  return (
    <group ref={group} {...props} dispose={null} scale={0.03}  >
      <group>
        <group>
          <primitive object={nodes._rootJoint} />
          <skinnedMesh geometry={nodes.fox.geometry} material={materials.fox_material} skeleton={nodes.fox.skeleton} onClick={toggleRun}  />
        </group>
      </group>
    </group>
  )
}


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
        <Model  />
        
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI/2} maxPolarAngle={Math.PI/2}/>
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
          <TextField id="outlined-basic" label="Username" style={{color:'white'}} value={currentUser} variant="filled" onChange={(e) => setCurrentUser(e.target.value)} />
          {/* <input
          type='text'
          required
          
          
          /> */}
          <Button onClick={handleSubmit} variant="contained" size="small" color="action" endIcon={<NavigationIcon size="small"  />}>
  Send
</Button>
          {/* <button>Submit</button> */}
        </form>
        
        
        
    </div>
    </>
  )
}

export default Home