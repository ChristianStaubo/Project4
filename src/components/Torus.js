import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
function Tourus() {

   const ref = useRef(null);
   useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));

   return (
      <mesh visible position={[10, 10, 10]} castShadow ref={ref}>
         <torusGeometry args={[10, 3, 16, 100]} />
         <meshStandardMaterial attach="material" color="red" />
      </mesh>
   );
}

export default Tourus