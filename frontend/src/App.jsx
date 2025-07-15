import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Default from './Pages/Default'
import Landing from './components/Landing'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Default/>,
    children:[
      {
        path:"/",
        element:<Landing/>
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/home",
        element:<Home/>
      }
    ]

  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App