import { TCat } from '@/features/cat/types'

export const cats: TCat[] = []

for (let i = 0; i < 10; i++) {
  cats.push({
    id: i,
    imageUrl: 'https://placekitten.com/250/200?image=' + i,
  })
}
