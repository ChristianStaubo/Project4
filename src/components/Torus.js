import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
function Tourus({color, position}) {

   const ref = useRef(null);
   //on every frame, change the x position of the torus so it rotates
   // useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));
   // useFrame(() => (ref.current.rotation.x = {Math.PI * 0.25}, ref.current.rotation.y ={Math.PI * 0.25}));
   // rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25}
   return (
      <mesh visible position={position} castShadow ref={ref}>
         <torusGeometry args={[10, 3, 16, 100]} />
         <meshStandardMaterial attach="material" color={color} />
      </mesh>
   );
}

export default Tourus