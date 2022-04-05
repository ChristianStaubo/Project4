import { useLoader } from '@react-three/fiber';
import React from 'react'
import { TextureLoader } from 'three';
import EarthDayMap from '../assets/8k_earth_daymap.jpg'
import EarthNormalMap from '../assets/8k_earth_normal_map.jpg'
import EarthSpecularMap from '../assets/8k_earth_specular_map.jpg'
import EarthCloudsMap from '../assets/8k_earth_clouds.jpg'

function Sphere({color, position, scale, mass}) {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );
  //useBox is cannon's way of assigning physics to an object. We set our ref and name api to usebox, and then use that api to give physics to our mesh.
  return (
    <mesh position={[0,20,10]}  >
      <sphereGeometry args={[10, 24, 24]} />
      <meshPhongMaterial specularMap={specularMap} />
      <meshStandardMaterial map={colorMap} normalMap={normalMap}/>
    </mesh>
  );
}

export default Sphere