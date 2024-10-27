import React, { useState } from 'react'
import { useRef } from 'react'
import { auth } from '../config/Firebase/Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  
  
    const email = useRef()
    const password = useRef()
     const [error, setError] = useState(false)

     const navigate = useNavigate()
    const loginUser = (event) =>{
     event.preventDefault()
     console.log(email.current.value)
     console.log(password.current.value);

       
     signInWithEmailAndPassword(auth, email.current.value, password.current.value)
     .then((userCredential) => {
       const user = userCredential.user;
       console.log(user);
       navigate('/')

     })
     .catch((error) => {
      const errorMessage = error.message;
       console.log(errorMessage);
       setError(errorMessage)

     });



    }
  
    return (
      <div>
        <h1>Login</h1>
       
         
         <form   onSubmit={loginUser} >
          <input type='email' placeholder='Please Enter your Name' ref={email} /> <br /> <br />
          <input type='password' placeholder='Enter Your Password' ref={password} /> <br /> <br />
          <button>Login</button>
  
         </form>
  
  
      </div>
    )
  }

export default Login
