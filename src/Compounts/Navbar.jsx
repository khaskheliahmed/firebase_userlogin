import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
     <nav>
     <ul className='flex justify-center gap-12  mt-3 bg-slate-800 text-lg text-white m-9 my-6'>
        <li className=' hover:text-yellow-400 hover:underline'>
            <h2><Link to={''}>Home</Link></h2>
        </li>
        <li className=' hover:text-yellow-400 hover:underline'>
            <h2><Link to={'/Login'}>Login</Link></h2>
        </li>
        <li className=' hover:text-yellow-400 hover:underline'>
            <h2><Link to={'Register'}>Register</Link></h2>
        </li>
        <li className=' hover:text-yellow-400 hover:underline'>
            <h2><Link to={'Content'}>Content</Link></h2>
        </li>

     </ul>
     </nav>
    </>
  )
}

export default Navbar
