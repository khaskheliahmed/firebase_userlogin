import React, { useRef, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/Firebase/Firebase'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const email = useRef()
  const password = useRef()



  const navigate = useNavigate()
  const loginUser = (event) =>{
   event.preventDefault()
   console.log(email.current.value)
   console.log(password.current.value);


   createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
   .then((userCredential) => {
     const user = userCredential.user;
     console.log(user)
     navigate('/')
   })
   .catch((error) => {
     const errorMessage = error.message;
     console.log(errorMessage)
   });
  }

  return (
    <div>
      <h1>Register</h1>
     
       
       <form   onSubmit={loginUser} >
        <input type='email' placeholder='Please Enter your Name' ref={email} /> <br /> <br />
        <input type='password' placeholder='Enter Your Password' ref={password} /> <br /> <br />
        <button>Login</button>

       </form>


    </div>
  )
}

export default Register
