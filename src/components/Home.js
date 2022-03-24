import React from 'react'
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'
function Home() {
    let navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        if (currentUser) {
            navigate('/world')
        }
    })
  return (
    <div>
        <h1>Welcome to GameHub</h1>
        
    </div>
  )
}

export default Home