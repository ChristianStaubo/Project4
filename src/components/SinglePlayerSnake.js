import React, {useEffect, useRef, useState} from 'react'
import { useNavigate } from "react-router-dom";
import * as io from 'socket.io-client'
import './snake.css'
const BG_COLOR = 'black'
const SNAKE_COLOR = 'red'
const FOOD_COLOR = 'green'


function SinglePlayerSnake() {
  let navigate = useNavigate()
  let currentUser = 'Spiderman'
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
    socket.current = io('http://localhost:3001')

    

    socket.current.on("connection", () => {
      console.log('Connected to socket')
    })
    // socket.current.on('singlePlayergameState', handleSinglePlayerGameState)
    // console.log('hello')
    // console.log(socket)
    // console.log(socket.current)
    init()
    socket.current.on('singlePlayergameState', handleSinglePlayerGameState)
  }, [])

  // function hideText() {
  //   initialScreen.current.style.display = 'none'
  // }
  // console.log(socket)
      // socket.on('init', handleInit)
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
        // scoreCount.current = scoreCount.current + 1
        // setCounter(counter + 1)
        // console.log('New count is => ', count)
        // console.log(counter)
        // console.log('score count', scoreCount.current)
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
  // window.location.reload(false);
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
  

  fetch('http://localhost:4000/gameHub/singlePlayerSnake', {
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
  // else {
  //   console.log('Something went wrong', res)
  // }
})}

useEffect(() => {
  handleSubmit()
},[gameFinished])

  
    return (
      <>
      <div id='gameOverScreen' style={{display: !gameFinished ? 'none' : 'block'}}>
      <h1>Game Over!</h1>
      <p>Your score was {scoreCount.current - 1}</p>
      <button onClick={reloadGame}>Play again</button>
      </div>
      <button onClick={reloadGame}>Play again</button>
      <div id='snakeScreen'>

        
        
        
        <div id="gameScreen" ref={gameScreen} >
          <div >

            

            <canvas id="canvas"></canvas>
            <p>Count: {counter}</p>
          </div>
        </div>

      </div>
      </>

    )
}

export default SinglePlayerSnake