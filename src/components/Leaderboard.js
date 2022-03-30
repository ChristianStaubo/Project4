import React, {useEffect, useState} from 'react'
import {Html} from '@react-three/drei'
import './world.css'
import axios from 'axios'
function Leaderboard({topscores}) {
    const [size, set] = useState(0.5)
    // let [topscores, setTopScores] = useState()

    // function getTopScores() {
    //   fetch('http://localhost:4000/gameHub/Leaderboard', {
        
    //   })
    //   .then((res) => {
    //    console.log(res)
    //    console.log('score 1 =>', res.data)
    //    console.log(res)
    // })
    // }

    // const getTopScores = async () => {
    //   try {
    //     const res = await axios.get('http://localhost:4000/gameHub/Leaderboard')
    //     console.log(res)
    //     console.log(res.data)
    //     setTopScores(res.data)
    //     // sortTopFive()
    //   }
    //   catch (err) {
    //     console.log(err)
    //   }
    // }

    // function sortTopFive(users) {
    //   let top5 = []
    //   for (let i = 0 ; i < users.length ; i++){
    //     if(users[i])
    //   }
    // } 

    // useEffect(() => {
    //   getTopScores()
    // },[])
    const [hidden, setVisible] = useState(false)
    return (
      <mesh scale={size * 2} position={[0, -2, -45]}  >
        <boxGeometry />
        <meshStandardMaterial color='red' />
        <Html
          style={{
            fontSize: '400px',
            color: 'whitesmoke'
            
            
          }}
          distanceFactor={2}
          position={[3.8, 20, -45]}
          transform
          occlude
          onOcclude={setVisible}>
        <h1>Snake Leaderboard</h1>
        <h6>  <span style={{fontSize:'200%'}}>1. {topscores[0].user}          {topscores[0].score} points, </span> </h6>
        {/* <p style={{fontSize:'200%'}}>  </p> */}
        <h6>2.</h6>
        <h6>3.</h6>
        <h6>4.</h6>
        <h6>5.</h6>
        <h6 className='invis'>1</h6>
        <h6 className='invis'>1</h6>
        <h6 className='invis'>1</h6>
        <h6 className='invis'>1</h6>
        <h6 className='invis'>1wa</h6>
        </Html>
      </mesh>
    )
  }

export default Leaderboard