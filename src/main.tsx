import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import Playground from './pages/Playground'
import Home from './pages/Home'

dayjs.locale('zh-cn')

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'playground',
        element: <Playground />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
