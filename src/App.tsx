import { Link, Outlet } from 'react-router-dom'

export function App() {
  return (
    <>
      <div className={'bg-amber-100 p-4 text-center text-5xl font-bold'}>Hello React!</div>

      <nav>
        <ul className={'flex gap-4 bg-slate-100 p-4 text-purple-800'}>
          <li className={'rounded border border-purple-400 p-1.5'}>
            <Link to={'home'}>Home</Link>
          </li>
          <li className={'rounded border border-purple-400 p-1.5'}>
            <Link to={'playground'}>Playground</Link>
          </li>
          <li className={'rounded border border-purple-400 p-1.5'}>
            <Link to={'algorithm'}>Algorithm</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}
