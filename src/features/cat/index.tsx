import { useRef } from 'react'
import { cats } from '@/features/cat/data/cats'

export function Cat() {
  const itemsRef = useRef(new Map<number, HTMLLIElement>())

  function scrollToId(itemId: number) {
    const node = itemsRef.current.get(itemId) as HTMLLIElement
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToId(0)}>Tom</button>
        <button onClick={() => scrollToId(5)}>Maru</button>
        <button onClick={() => scrollToId(9)}>Jellylorum</button>
      </nav>
      <div>
        <ul>
          {cats.map((cat) => (
            <li
              key={cat.id}
              ref={(node) => {
                const map = itemsRef.current
                if (node) {
                  map.set(cat.id, node)
                } else {
                  map.delete(cat.id)
                }
              }}
            >
              <img src={cat.imageUrl} alt={'Cat #' + cat.id} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
