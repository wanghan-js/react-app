export function SearchBar() {
  return (
    <form>
      <input className={'rounded border border-amber-300'} type='text' placeholder={'Search...'} />
      <label>
        <input type='checkbox' /> Only show products in stock
      </label>
    </form>
  )
}
