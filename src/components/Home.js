import React from 'react'
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'
function Home() {
    let navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState('')

    // useEffect(() => {
    //     if (currentUser) {
    //         navigate('/world')
    //     }
    // })

    const handleSubmit = (e) => {
      e.preventDefault()
      let user = {currentUser}
      console.log(user)

      fetch('http://localhost:4000/gameHub', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("currentUser", currentUser);
          setCurrentUser({
            currentUser
          })
          console.log('Local user =>', currentUser)
          console.log(localStorage)
          navigate('/world')
      };
    })}
  return (
    <div>
        <h1>Welcome to GameHub</h1>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
          type='text'
          required
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value)}
          />
          <button>Submit</button>
        </form>
        
        
    </div>
  )
}

export default Home