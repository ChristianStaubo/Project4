import React from 'react'
import {Physics, useBox, usePlane} from '@react-three/cannon'




function Box() {
    const [ref, api] = useBox(() => ({mass: 1, position: [0,2,0]}))
    return (
      <mesh onClick={() => {
        api.velocity.set(0,10,0)
      }} ref={ref} >
        <boxBufferGeometry attach='geometry' />
        <meshLambertMaterial attach='material' color={0xff0000} />
      </mesh>
    )
  }

export default Box