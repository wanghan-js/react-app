import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <div className={'text-center text-6xl font-bold'}>Hello React!</div>

      <nav>
        <ul>
          <li>
            <Link to={'home'}>Home</Link>
          </li>
          <li>
            <Link to={'playground'}>Playground</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

export default App
