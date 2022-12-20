import { Link, Outlet } from 'react-router-dom'

export function App() {
  const links = [
    {
      label: 'Home',
      path: 'home',
    },
    {
      label: 'playground',
      path: 'Playground',
    },
    {
      label: 'Algorithm',
      path: 'algorithm',
    },
  ]
  return (
    <>
      <div className={'bg-amber-100 p-4 text-center text-5xl font-bold'}>Hello React!</div>

      <nav>
        <ul className={'flex gap-4 bg-slate-100 p-4 text-purple-800'}>
          {links.map((item) => (
            <li key={item.path}>
              <Link className={'block rounded border border-purple-400 p-1.5'} to={item.path}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Outlet />
    </>
  )
}
