import React, {useEffect, useRef, useState} from 'react'
import * as io from 'socket.io-client'
import './snake.css'
const BG_COLOR = '#231f20'
const SNAKE_COLOR = 'red'
const FOOD_COLOR = '#e66916'


function Snake() {
  const socket = useRef()
  const gameScreen = useRef()
  const initialScreen = useRef()
  const newGameBtn = useRef()
  const joinGameBtn = useRef()
  const gameCodeInput = useRef()
  const gameCodeDisplay = useRef()
  const [gameCodeInputValue, setGameCodeInputValue] = useState()
  let [gameFinished, setGameFinished] = useState(false)
  let [playerResult, setPlayerResult] = useState('Walter')


  useEffect(() => {
    socket.current = io('http://localhost:3001')

    // socket.current.on("connection", () => {
    //   console.log('connected to server')
    // })

    socket.current.on("connection", () => {
      console.log('Connected to socket')
      
    })
    socket.current.emit('singlePlayer', false)
    // hideText()
  }, [])

  // function hideText() {
  //   initialScreen.current.style.display = 'none'
  // }
  // console.log(socket)
      // socket.on('init', handleInit)
      useEffect(() => {
        socket.current.on('gameState', handleGameState)
        socket.current.on('gameOver', handleGameOver)
        socket.current.on('gameCode', handleGameCode)
        socket.current.on('unknownGame', handleUnknownGame)
        socket.current.on('tooManyPlayers', handleTooManyPlayers)
        socket.current.on('init',handleInit)
      }, [socket.current])
  


  

  //send socket telling it to create a new game
  function newGame() {
      socket.current.emit('singlePlayer', false)
      socket.current.emit('newGame')
      init()
  }

  function joinGame() {
      socket.current.emit('singlePlayer', false)
      const code = gameCodeInputValue
      //send code to socket
      socket.current.emit('joinGame', code)
      init()
  }

  let canvas, ctx
  let playerNumber
  let gameActive = false
  // //player position and velocity, snake length in an array, food position on board and grid size


  function init() {

      initialScreen.current.style.display = 'none'
      gameScreen.current.style.display = 'block'

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
      // console.log(gameActive)
      socket.current.emit('keydown', e.keyCode, gameActive)
      
  }

  // // init()

  function paintGame(state) {
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
      console.log(state.players)
      //color player (snake)
      paintPlayer(state.players[0],size, SNAKE_COLOR)
      paintPlayer(state.players[1],size, 'blue')
  }

  function paintPlayer(playerState, size, color) {
      const snake = playerState.snake
      ctx.fillStyle = color
      console.log(snake)
      //color in snake
      for (let i = 0 ; i < snake.length ; i++){
          ctx.fillRect(snake[i].x * size, snake[i].y * size, size, size)
      }
      
  }



  function handleInit(number) {
      playerNumber = number
      // console.log(msg)
  }
  // //when io server sends gameState update, run paintGame which updates the board
  function handleGameState(gameState) {
      if (!gameActive) {
          return
      }
      gameState = JSON.parse(gameState)
      requestAnimationFrame(() => paintGame(gameState))
  }

  function handleGameOver(data) {
      if (!gameActive) {
          return
      }
      data = JSON.parse(data)
      setGameFinished(true)

      if (data.winner === playerNumber) {
          setPlayerResult('Won')
      }
      else {
          setPlayerResult('Lost')
      }
      gameActive = false
  }

  function handleGameCode(gameCode) {
      console.log(gameCode)
      gameCodeDisplay.current.innerText = gameCode
  }

  function handleUnknownGame() {
      reset()
      alert("Unkown game code")
  }

  function handleTooManyPlayers() {
      reset()
      alert("This game is already in progress")
  }

  function reset() {
      playerNumber = null
      gameCodeInput.current.value = ""
      gameCodeDisplay.current.innerText = ''
      initialScreen.current.style.display = 'block'
      gameScreen.current.style.display = 'none'
  }

  function reloadGame() {
    window.location.reload(false);
    
  }

  
    return (
      <section >
        <div id='gameOverScreen' style={{display: !gameFinished ? 'none' : 'block'}}>
      <h1>Game Over!</h1>
      <p>You {playerResult}</p>
      <button onClick={reloadGame}>Play again</button>
      </div>
      <div >

        <div id="initialScreen" ref={initialScreen} >
          <div >
              <h1>Multiplayer Snake</h1>
              <button
                onClick={() => {
                  newGame()
                }}
                ref={newGameBtn}
                type="submit"
                
                id="newGameButton"
              >
                Create New Game
              </button>
              <div>OR</div>
              <div >
                <input type="text" value={gameCodeInputValue}
                onChange={e => setGameCodeInputValue(e.target.value)}
                 placeholder="Enter Game Code" id="gameCodeInput" ref={gameCodeInput}/>
              </div>
              <button
                onClick={() => {
                  joinGame()
                }}
                type="submit"
                ref={joinGameBtn}
                id="joinGameButton"
              >
                Join Game
              </button>
          </div>
        </div>
        <div id='snakeScreen'>
        <div id="gameScreen" ref={gameScreen} >
          <div >

            <h1>Your game code is: <span id="gameCodeDisplay" ref={gameCodeDisplay}></span></h1>

            <canvas id="canvas"></canvas>
          </div>
          </div>
        </div>

      </div>
    </section>

    )
}

export default Snake