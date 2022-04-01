import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
function Tourus({color, position, scale}) {

   const ref = useRef();
   // let t = 0
   // useFrame(() => {
   //    // group.current.rotation.y += 0.01
   //    // ref.current.rotation.y += 0.005
   //    t += 0.02;          
      
   //    ref.current.rotation.y += 0.01;
  
   //    ref.current.position.x = 2.5*Math.cos(t) + 0.5
   //    ref.current.position.z = 2.5*Math.sin(t) + 0.5
   //  })
   //on every frame, change the x position of the torus so it rotates
   // useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));
   // useFrame(() => (ref.current.rotation.x = {Math.PI * 0.25}, ref.current.rotation.y ={Math.PI * 0.25}));
   // rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25}
   return (
      <mesh visible position={position} castShadow ref={ref} scale={scale}>
         <torusGeometry args={[10, 3, 16, 100]} />
         <meshStandardMaterial attach="material" color={color} />
      </mesh>
   );
}

export default Tourus