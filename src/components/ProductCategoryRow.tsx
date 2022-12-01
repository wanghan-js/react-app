type ProductCategoryRowProps = {
  category: string | null
}

export function ProductCategoryRow({ category }: ProductCategoryRowProps) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  )
}
