import { useState, useEffect } from 'react';



//map action to key
function actionByKey(key) {
  const keys = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
  };
  return keys[key];
}

export const useKeyboardControls = () => {
  //movement state, initalized to false for all
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });


  useEffect(() => {
    const handleKeyDown = (e) => {
      // Movement key
      //if movement key
      if (actionByKey(e.code)) {
        //set movement key that was clicked to be set to true
        setMovement((state) => ({
          ...state,
          [actionByKey(e.code)]: true,
        }));
      }
      
    };
    const handleKeyUp = (e) => {
      //if movement key
      if (actionByKey(e.code)) {
        setMovement((state) => ({
          //change that key to be false
          ...state,
          [actionByKey(e.code)]: false,
        }));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [setMovement]);
  //this returns the new movement values when a movement key is pressed
  return movement;
};