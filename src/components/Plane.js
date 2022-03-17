import React from 'react'
import {Physics, useBox, usePlane} from '@react-three/cannon'

function Plane() {
    const [ref] = usePlane(() => ({
      rotation: [-Math.PI / 2,0,0],
  
    }))
    return (
      <mesh position={[0,0,0]} rotation={[-Math.PI / 2,0,0]}>
        <planeBufferGeometry attach='geometry' args={[100,100]}/>
        <meshLambertMaterial attach='material' color='lightblue' />
      </mesh>
    )
  }

export default Plane