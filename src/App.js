import './App.css';
import {Canvas,} from '@react-three/fiber'
//npm i @react-three/drei
import {OrbitControls, Stars, Torus} from '@react-three/drei'
// npm i @react-three/cannon
import {Physics, useBox, usePlane} from '@react-three/cannon'
import Tourus from './components/Torus';
import { Player } from './components/Player';
function Box() {
  const [ref, api] = useBox(() => ({mass: 1, position: [0,2,0]}))
  return (
    <mesh onClick={() => {
      api.velocity.set(0,2,0)
    }} ref={ref} position={[0,2,0]}>
      <boxBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' color='hotpink' />
    </mesh>
  )
}

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
function App() {
  return (
   <Canvas>
     <Physics>
      <Box position={[0,2,0]}/>
      <Box position={[10,3,2]}/>
      <Box position={[5,5,5]}/>
      <Box/>
      <Tourus />
      <Player position={[0, 3, 10]} />
    <Plane/>
    </Physics>
    {/* <OrbitControls /> */}
    <Stars />
    <ambientLight intensity={0.5} />
    <spotLight
    position={[10,15,10]}
    angle={0.3}
    />
   </Canvas>
  );
}

export default App;
