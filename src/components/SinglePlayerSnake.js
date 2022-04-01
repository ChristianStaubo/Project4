import { Button } from '@mui/material';
import React, {useEffect, useRef, useState} from 'react'
import { useNavigate } from "react-router-dom";
import * as io from 'socket.io-client'
import './snake.css'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});
const BG_COLOR = '#C0C0C0'
const SNAKE_COLOR = 'red'
const FOOD_COLOR = '#66FF99'




function SinglePlayerSnake() {
  let navigate = useNavigate()
  let currentUser = localStorage.currentUser
  let scoreCount = useRef(0)
  let [counter,setCounter] = useState(0)
  let [gameFinished, setGameFinished] = useState(false)
  const socket = useRef()
  const gameScreen = useRef()
  let singlePlayer = true

  const gameState = {
    player: {
        pos: {
            x:3,
            y:10,
        },
        vel: {
            x:0,
            y:0,
        },
        snake: [
            {x:1, y:10},
            {x:2,y:10},
            {x:3,y:10},
        ]
    },
    food: {
        x: 7,
        y: 7,
    },
    gridSize: 20
}

  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_SOCKET}`)

    

    socket.current.on("connection", () => {
      console.log('Connected to socket')
    })
      socket.current.emit('singlePlayer', singlePlayer)
      socket.current.on('singlePlayergameState', handleSinglePlayerGameState)
    init()
    
    
    
    
  }, [])

  
      useEffect(() => {
        socket.current.on('singlePlayergameState', handleSinglePlayerGameState)
        socket.current.on('gameOver', handleGameOver)
        socket.current.on('showScore', handleShowScore)
        socket.current.on('init', handleInit)
      }, [socket.current])
      
      function handleInit(msg) {
        console.log(msg)
      }
      
      function handleShowScore(count) {
       
        setCounter(counter + 1)
        scoreCount.current = scoreCount.current + 1
      }


  

  //send socket telling it to create a new game
  

  let canvas, ctx
  let playerNumber
  let gameActive = false
  // //player position and velocity, snake length in an array, food position on board and grid size


  function init() {
    if (singlePlayer !== true) {
    gameScreen.style.display = 'block'
    }
    // canvas = gameScreen.current
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    
    canvas.width = canvas.height = 600

    ctx.fillStyle = BG_COLOR
    //fill canvas with black color
    ctx.fillRect(0,0, canvas.width, canvas.height)

    document.addEventListener('keydown', keydown)
    gameActive = true

    
}

  function keydown(e) {
      console.log('PRESSING')
      socket.current.emit('keydown', e.keyCode)
  }

  // init()

  function singlePlayerPaintGame(state) {
    //color board
    ctx.fillStyle = BG_COLOR
    ctx.fillRect(0,0,canvas.width,canvas.height)

    const food = state.food
    const gridSize = state.gridSize
    //calculate pixels per gride square in game space
    const size = canvas.width / gridSize
    //color food tile
    ctx.fillStyle = FOOD_COLOR
    ctx.fillRect(food.x * size, food.y * size, size, size)
    console.log('Score is =>',state.score)
    scoreCount.current = state.score
    incrementCounter(state.score)
    
    //color player (snake)
    paintPlayer(state.player,size, SNAKE_COLOR)
}

  function paintPlayer(playerState, size, color) {
      const snake = playerState.snake
      ctx.fillStyle = SNAKE_COLOR
      // console.log('This is snake',snake)
      // console.log(playerState)
      //color in snake
      for (let i = 0 ; i < snake.length ; i++){
          ctx.fillRect(snake[i].x * size, snake[i].y * size, size, size)
      }
      

      

      
  }

 



  
  // //when io server sends gameState update, run paintGame which updates the board
  function handleSinglePlayerGameState(gameState) {
    
    gameState = JSON.parse(gameState)
    requestAnimationFrame(() => singlePlayerPaintGame(gameState))
    
  
}
  function handleGameOver(data) {
      
      console.log('GAME IS OVER')
      setGameFinished(true)
  }


function startGame() {
  
  init()
  socket.current.on('singlePlayergameState', handleSinglePlayerGameState)
}

function reloadGame() {
  window.location.reload(false);
  init()
  socket.current.on('singlePlayergameState', handleSinglePlayerGameState)
}



function incrementCounter(score) {
  setCounter(score)
}

const handleSubmit = (e) => {
  let score = counter
  let user = currentUser
  let packageToSend = {user, score}
  console.log(packageToSend)
  

  fetch(`${process.env.REACT_APP_BACKEND_SERVER}/gameHub/singlePlayerSnake`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(packageToSend),
    credentials: "include",
  })
 
  .then((res) => {
    console.log(res)
    if (res.status === 200) {
      console.log('Succes',res)
  }
  
})}

useEffect(() => {
  handleSubmit()
},[gameFinished])

function returnHome() {
  navigate('/world')
}

  
    return (
      <>
      <div id='gameOverScreen' style={{display: !gameFinished ? 'none' : 'block'}}>
      <h1>Game Over!</h1>
      <p>Your score was {scoreCount.current}</p>
      <Button onClick={reloadGame} size='small' variant="contained" color='primary' style={{marginRight:'3%'}}>Play again</Button>
      <span>Or</span>
      <ThemeProvider theme={theme}>
      <Button onClick={returnHome} size='small' style={{marginLeft:'3%'}} variant="contained" color="neutral">Go back</Button>
      </ThemeProvider>
      </div>
      <div id='snakeScreen'>
        <div id="gameScreen"  ref={gameScreen} >
          <div >
            <canvas  id="canvas"></canvas>
            <p style={{fontSize:'150%'}}>Score {counter}</p>
          </div>
        </div>
      </div>
      </>

    )
}

export default SinglePlayerSnake