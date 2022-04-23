import { Search } from '@mui/icons-material'
import { InputBase, MenuItem, Paper } from '@mui/material'
import { useContext, useState } from 'react'
import { movieContext } from '../Context/useContext'

export default function SearchList() {
  const { state, seachMovies, getAllMovies } = useContext(movieContext)
  const [isOpen, setOpen] = useState(false)
  const handleChange = ({ target }: any) => {
    seachMovies(target.value)

    if (state.filter.length > 0) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }
  return (
    <div className="main-container">
      <div className="container-icon">
        <Search />
      </div>
      <InputBase
        placeholder="Search…"
        //value={text}
        style={{ width: '100%' }}
        onChange={handleChange}
      />
      {isOpen && (
        <Paper className="container-results" square>
          {state.filter.slice(0, 10).map((suggestion) => (
            <MenuItem
              key={suggestion.title}
              component="div"
              onClick={() => {
                getAllMovies({ limit: 2, page: 1, search: suggestion.title })
                setOpen(false)
              }}
            >
              {suggestion.title}
            </MenuItem>
          ))}
        </Paper>
      )}
    </div>
  )
}
