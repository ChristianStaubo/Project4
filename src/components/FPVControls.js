import React, { useEffect } from 'react';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';
import { useThree, extend } from '@react-three/fiber';
import { useRef } from 'react';

extend({ PointerLockControlsImpl });

export const FPVControls = (props) => {
  //useThree gives us access to the state model, we pass in the camera and the webGlRenderer
  const { camera, gl } = useThree();
  const controls = useRef();

  useEffect(() => {
    //when you click on page, controls will lock
    document.addEventListener('click', () => {
      controls.current.lock();
      console.log(controls)
    });
  }, []);
  //the pointerLock controls will sync our camera and our renderer so we can look around
  return (
    <pointerLockControlsImpl
      ref={controls}
      args={[camera, gl.domElement]}
      {...props}
    />
  );
};