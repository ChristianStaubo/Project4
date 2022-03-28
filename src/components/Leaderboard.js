import React, {useState} from 'react'
import {Html} from '@react-three/drei'
import './world.css'
function Leaderboard() {
    const [size, set] = useState(0.5)
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
        <h6>1.</h6>
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