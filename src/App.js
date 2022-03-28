import './App.css';
import World from './components/World';
import Snake from './components/Snake';
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Home from './components/Home';
import SinglePlayerSnake from './components/SinglePlayerSnake';

// useFrame(() => {
  //   console.log(pos)
  // })

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPosition, setCurrentPosition] = useState(null)
  
  
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>

      <Route path='/multiplayerSnake' element={<Snake  />}> </Route>

      <Route path='/world' element={<World currentUser={currentUser}setCurrentUser={setCurrentUser} />}></Route>

      <Route path='/singleplayerSnake' element={ <SinglePlayerSnake />}></Route>

    </Routes>
  

  
  );
}

export default App;
