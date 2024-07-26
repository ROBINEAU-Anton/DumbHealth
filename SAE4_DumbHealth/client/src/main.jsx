import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from '~react-pages'


const router = createBrowserRouter(routes)

console.log(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
