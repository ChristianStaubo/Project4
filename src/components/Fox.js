/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model({ ...props }) {
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
          actions.Walk.play()
      }
      else {
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

useGLTF.preload('/fox.gltf')
