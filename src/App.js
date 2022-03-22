import './App.css';
import {Canvas,} from '@react-three/fiber'
//npm i @react-three/drei
import {OrbitControls, Stars, Torus} from '@react-three/drei'
// npm i @react-three/cannon
import {Physics, useBox, usePlane} from '@react-three/cannon'
import Tourus from './components/Torus';
import { Player } from './components/Player';
import Box from './components/Box';
import Plane from './components/Plane';
import { useThree, useFrame } from '@react-three/fiber';
import Snake from './components/Snake';
// useFrame(() => {
  //   console.log(pos)
  // })

function App() {
  
  return (
   <Canvas>
     <Physics>
      <Box position={[0,5,0]} color={'hotpink'}/>
      {/* <Box position={[10,3,2]} color={'lightgreen'}/> */}
      {/* <Box position={[5,5,5]} color={'salmon'}/> */}
      {/* <Box/> */}
      <Tourus color={'red'} />
      <Player position={[0, 3, 10]} />
    <Plane color={'lightblue'}/>
    </Physics>
    {/* <OrbitControls /> */}
    <Stars />
    <ambientLight intensity={0.5} />
    <spotLight
    position={[10,15,10]}
    angle={0.3}
    />
   </Canvas>
  // <Snake />
  );
}

export default App;
