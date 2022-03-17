// import './App.css';
// import {Canvas,} from '@react-three/fiber'
// //npm i @react-three/drei
// import {OrbitControls, Stars} from '@react-three/drei'
// // npm i @react-three/cannon
// import {Physics, useBox, usePlane, useSphere, useFrame, frontVector, sideVector, direction} from '@react-three/cannon'
// import Box from './components/Box';
// import Plane from './components/Plane';
// import {usePersonControls} from './hooks/UsePersonControls'
// function App() {
//   const { forward, backward, left, right, jump } = usePersonControls()

//   const [mesh, api] = useSphere(() => ({
//     mass: 10,
//     position: [0, 1, 0],
//     type: 'Dynamic',
// }))

// useFrame(() => {
//   // Calculating front/side movement ...
//   frontVector.set(0, 0, Number(forward) - Number(backward))
//   sideVector.set(Number(right) - Number(left), 0, 0)
//   direction
//     .subVectors(frontVector, sideVector)
//     .normalize()
//     .multiplyScalar(SPEED)

//   api.velocity.set(direction.x, 0, direction.z)
// })

// useFrame(() => {
//   // mesh.current.getWorldPosition(playerModelReference.current.position)
// })
//   return (
//    <Canvas>
//      <Physics>
//      <Box position={[0,2,0]}/>
//      <Box position={[10,3,2]}/>
//      <Box position={[5,5,5]}/>
//      {/* <Box position={[0,10,0]}/> */}
//     <Plane/>
//     </Physics>
//     {/* <OrbitControls /> */}
//     <Stars />
//     <ambientLight intensity={0.5} />
//     <spotLight
//     position={[10,15,10]}
//     angle={0.3}
//     />
//    </Canvas>
//   );
// }

// export default App;
