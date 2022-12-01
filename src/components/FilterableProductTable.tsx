import { SearchBar } from './SearchBar'
import { ProductTable } from './ProductTable'
import { PRODUCTS } from '../data/mock'

export function FilterableProductTable() {
  return (
    <div className={'m-4 rounded border border-red-500 p-4 font-medium'}>
      <SearchBar />
      <ProductTable products={PRODUCTS} />
    </div>
  )
}
