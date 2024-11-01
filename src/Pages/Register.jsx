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
     navigate('/login')
   })
   .catch((error) => {
     const errorMessage = error.message;
     console.log(errorMessage)
   });
  }

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>
         
         <form   onSubmit={loginUser} >

          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>

          <input type='email' placeholder='Please Enter your Name' ref={email} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent" /> <br /> <br />

          <div className="mb-6">

<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
  Password
</label>

          <input type='password' placeholder='Enter Your Password' ref={password} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent" /> <br /> <br />
          <button className= 'bg-indigo-500 text-gray font-bold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50'>Login</button>
          
          </div>
          </div>
         </form>
         
         </div>
         </div>
    </div>
  )
}

export default Register
