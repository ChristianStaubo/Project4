import React, {useEffect, useRef, useState} from 'react'
import * as io from 'socket.io-client'
// import socket from 'socket.io-client/lib/socket'
const BG_COLOR = '#231f20'
const SNAKE_COLOR = 'red'
const FOOD_COLOR = '#e66916'
// let socket = io('http://localhost:3000')


function SinglePlayerSnake() {
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
            x:1,
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

    // socket.current.on("connection", () => {
    //   console.log('connected to server')
    // })

    socket.current.on("connection", () => {
      console.log('Connected to socket')
    })
    console.log('hello')
    console.log(socket)
    console.log(socket.current)
    // hideText()
  }, [])

  // function hideText() {
  //   initialScreen.current.style.display = 'none'
  // }
  // console.log(socket)
      // socket.on('init', handleInit)
      useEffect(() => {
        socket.current.on('singlePlayergameState', handleSinglePlayerGameState)
        socket.current.on('gameOver', handleGameOver)
      }, [socket.current])
  


  

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
      // console.log(e.keyCode)
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
    console.log(state.player)
    //color player (snake)
    paintPlayer(state.player,size, SNAKE_COLOR)
}

  function paintPlayer(playerState, size, color) {
      const snake = playerState.snake
      ctx.fillStyle = SNAKE_COLOR
      console.log(snake)
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
      if (!gameActive) {
          return
      }
      data = JSON.parse(data)

      if (data.winner === playerNumber) {
          alert('You win')
      }
      else {
          alert('You lose')
      }
      gameActive = false
  }

//   if (singlePlayer === true) {
//     init()
// }
function startGame() {
  init()
}
  

  // function reset() {
  //     playerNumber = null
  //     gameScreen.current.style.display = 'none'
  // }
    return (
      <section >
        {/* <h1 onClick={() => startGame}>Hello</h1> */}
      <div >

        
        <button onClick={startGame}>Play game</button>
        <div id="gameScreen" ref={gameScreen} >
          <div >

            

            <canvas id="canvas"></canvas>
          </div>
        </div>

      </div>
    </section>

    )
}

export default SinglePlayerSnake