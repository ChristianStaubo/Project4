import React, { useRef } from 'react'
import {Physics, useBox, usePlane} from '@react-three/cannon'

function Plane({color}) {
  //here we used usePlane similar to usebox, but we don't need any physics for this plane as it's our "ground". So we don't reference an api in our mesh to give it physical properties.
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2,0,0],

  }))
  //args are the dimensions, width, height, widthSegments, heightSegments
  return (
    <mesh position={[0,0,0]} rotation={[-Math.PI / 2,0,0]}>
      <planeBufferGeometry attach='geometry' args={[100,100]}/>
      <meshLambertMaterial attach='material' color={color} />
    </mesh>
  )
}

export default Plane