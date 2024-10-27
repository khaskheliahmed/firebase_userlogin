import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
     
     <ul>
        <li>
            <h2><Link to={''}>Home</Link></h2>
        </li>
        <li>
            <h2><Link to={'/Login'}>Login</Link></h2>
        </li>
        <li>
            <h2><Link to={'Register'}>Register</Link></h2>
        </li>
        <li>
            <h2><Link to={'Content'}>Content</Link></h2>
        </li>

     </ul>
    
    </>
  )
}

export default Navbar
