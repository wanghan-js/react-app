import { Product } from './typing'
import { ProductCategoryRow } from './ProductCategoryRow'
import { ProductRow } from './ProductRow'

type ProductTableProps = {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
  const rows: JSX.Element[] = []
  let lastCategory = ''

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow category={product.category} key={product.category} />)
    }
    rows.push(<ProductRow product={product} key={product.name} />)
    lastCategory = product.category
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}
