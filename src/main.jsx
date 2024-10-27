import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import About from './Pages/About.jsx'
import Register from './Pages/Register.jsx'
import Content from './Pages/Content.jsx'

const router = createBrowserRouter([
  {

  path:'/',
  element:<Layout/>,
  children: [
    {
      path:'',
      element:<Home/>
    },
    {
      path:'login',
      element:<Login/>
    },
    {
      path:'register',
      element:<Register/>
    },
    {
      path:'about',
      element:<About/>
    },
    {
      path:'Register',
      element:<Register/>
    },
    {
      path:'content',
      element:<Content/>
    },


  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <RouterProvider router={router} />
    <App />
  </StrictMode>,
)
