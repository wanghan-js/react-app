import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import './index.css'

import { App } from '@/App'
import { Algorithm } from '@/pages/Algorithm'
import { ErrorPage } from '@/pages/ErrorPage'
import { Home } from '@/pages/Home'
import { Playground } from '@/pages/Playground'
import { TodoPage } from '@/pages/TodoPage'
import { ChakraProvider } from '@chakra-ui/react'

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
      {
        path: 'algorithm',
        element: <Algorithm />,
      },
    ],
  },
  {
    path: '/todo',
    element: <TodoPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
