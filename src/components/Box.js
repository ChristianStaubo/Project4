import React from 'react'
import {Physics, useBox, usePlane} from '@react-three/cannon'




function Box({color, position}) {
  // const [ref, api] = useBox(() => ({mass: 1, position: [0,2,0]}))
  //useBox is cannon's way of assigning physics to an object. We set our ref and name api to usebox, and then use that api to give physics to our mesh.
  const [ref, api] = useBox(() => ({mass: 1}))
  return (
    <mesh onClick={() => {
      api.velocity.set(0,2,0)
    }} ref={ref} >
      <boxBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' color={color} position={position} />
    </mesh>
  )
}

export default Box