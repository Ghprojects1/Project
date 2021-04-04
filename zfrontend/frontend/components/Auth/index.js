import React, {useState} from 'react'
import Login from './Login'
import Register from './Register'



export default function Home() {
  const [newUser, setNewUser]= useState(false)
  return newUser?(    
    <Register setNewUser= {setNewUser}/>
  ): (
    <Login setNewUser= {setNewUser}/>
  )
  
}
