import React, { Suspense } from 'react'
import { useNavigate } from "react-router-dom";
import {useState, useEffect, useRef} from 'react'
import { Canvas } from '@react-three/fiber';
import './home.css'
import Torus from './Torus'
import Model from './Fox';
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import { Button, Card, CardContent, Fab, Grid, IconButton, Paper, TextField, Typography,} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import NavigationIcon from '@mui/icons-material/Navigation';
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { ThemeProvider } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#eeeeee',
    },
    secondary: {
      main: green[500],
    },
  },
});



function Home() {
    let navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState('')

    function makeRandomUserName(length) {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }
    const handleSubmit = (e) => {
      e.preventDefault()
      let user = {currentUser}
      console.log(user)

      fetch(`${process.env.REACT_APP_BACKEND_SERVER}/gameHub/gameHub`, {
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
      }
      
    })
    .catch(err => {
      console.log(err)
      console.log('Error, cors from your end probably idk why yet. Setting username to be default')
        let randomUserName = 'User' + makeRandomUserName(8).toString()
        console.log(randomUserName)
        localStorage.setItem("currentUser",randomUserName)
        navigate('/world')
    })
  }
    
  return (
    <>
    
    <Canvas style={{display:'block', width:'500px', height:'400px', margin:'0 auto', alignItems:'center'}}>
        <Suspense fallback={null}>
        <Model  />
        
      </Suspense>
      {/* <Torus color={'red'} position={[0, 0, 0]} scale={0.02}  /> */}
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI/2} maxPolarAngle={Math.PI/2}/>
      {/* get rid of drag on orbit controls */}
      <ambientLight intensity={0.5} />
      <spotLight
      position={[10,15,10]}
      angle={0.3}
      />
        </Canvas>
        
        <Grid>
        <div id='gamehubHomeDiv'>
  <div id='title'>
    <h1 className='h1'>Welcome to GameHub</h1>
    <p>Choose a username and experience the world of gamehub!</p>
    </div>
    </div>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto", marginBotton:'10%' }}>
          <CardContent>
            <form >
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} item>
                  <TextField placeholder="Enter Username" label="Username" variant="outlined" fullWidth value={currentUser} onChange={(e) => setCurrentUser(e.target.value)}  />
                </Grid>
                
                  
                <Grid item xs={12}>
                  <ThemeProvider theme={theme}>
                   
                  <Button type="submit" onClick={handleSubmit} variant="contained" color="primary" fullWidth> <NavigationIcon fullWidth/></Button>
                  </ThemeProvider>
                </Grid>

              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default Home