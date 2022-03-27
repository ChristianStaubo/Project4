import React, {useEffect, useRef, useState} from 'react'
import { useNavigate } from "react-router-dom";
import * as io from 'socket.io-client'
const BG_COLOR = '#231f20'
const SNAKE_COLOR = 'red'
const FOOD_COLOR = '#e66916'


function SinglePlayerSnake() {
  let navigate = useNavigate()
  let currentUser = 'Spiderman'
  let scoreCount = useRef(0)
  let [counter,setCounter] = useState(0)
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
        console.log('This is count', count)
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
    // console.log(state.player)
    
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
      handleSubmit()
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



function incrementCounter() {
  setCounter(counter + 1)
}

const handleSubmit = (e) => {
  
  let score = {currentUser, counter}
  console.log(score)
  

  fetch('http://localhost:4000/gameHub/singlePlayerSnake', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(score),
    credentials: "include",
  })
  .then((res) => res.json())
  .then((res) => {
    
    if (res.status === 200) {
      console.log('Succes',res)
  }
  else {
    console.log('Something went wrong', res)
  }
})}

  
    return (
      <section >
       
      <div >

        
        <button onClick={startGame}>Play game</button>
        <button onClick={reloadGame}>Reload game</button>
        <div id="gameScreen" ref={gameScreen} >
          <div >

            

            <canvas id="canvas"></canvas>
            <p>Counter:{scoreCount.current}</p>
            <p onClick={incrementCounter}>Counter:{counter}</p>
          </div>
        </div>

      </div>
    </section>

    )
}

export default SinglePlayerSnake