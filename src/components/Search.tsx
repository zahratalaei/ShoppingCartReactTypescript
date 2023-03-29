import {useState} from 'react'

type Props = {
     searchProducts:(search:string)=>void
}

const Search = ({searchProducts}:Props) => {
     const [search, setSearch] = useState<string>('')
     const submitHandler = (e:React.FormEvent<HTMLFormElement>) =>{
          e.preventDefault();
          searchProducts(search)
     }
  return (
    <form onSubmit={submitHandler}>
     <input type="text" placeholder='Search title' value={search} onChange={(e)=>setSearch(e.target.value)} />
     <button type='submit'>Search</button>

    </form>
  )
}

export default Search