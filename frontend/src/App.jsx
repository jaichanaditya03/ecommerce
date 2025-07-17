import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Default from './Pages/Default'
import Landing from './components/Landing'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { PrivateRoute, PublicRoute } from './components/RouteGuards'
import EditProduct from './Pages/EditProduct'
import AddProduct from './Pages/AddProduct';
//import { AddProduct } from './api/product'
import Products from './Pages/Products'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/home',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        )
      },
      {
        path: '/login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        )
      },
      {
        path: '/register',
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        )
      },
      {
        path: '/products',
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        )
      },
      {
        path: '/products/add',
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        )
      },
      {
        path: '/products/edit/:id',
        element: (
          <PrivateRoute>
            <EditProduct />
          </PrivateRoute>
        )
      },
    ]
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App