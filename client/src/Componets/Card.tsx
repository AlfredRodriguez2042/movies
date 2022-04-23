import React, { useContext, useState } from 'react'
import { Card, CardContent, Grid, Pagination, Stack, Typography } from '@mui/material'
import { movieContext } from '../Context/useContext'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  grid: {
    margin: '1em !important',
  },
}))
const CardMovie = () => {
  const { state,getAllMovies } = useContext(movieContext)
  const [page,setPage]=useState(1)

  const handleChange=(_:any,value:any)=>{
    
    getAllMovies({limit:10,page:value})
  }
const classes = useStyles()
  return (
    <>
      {state.movies?.map((movie) => (
        <Grid item key={movie.title} xs={3}  className={classes.grid}>
          <Card>
            <CardContent>
              <Typography>{movie.title}</Typography>
              <Typography>
                <small>({movie.year})</small>
                {movie.category}
              </Typography>
              <Typography>
                Actors:
                {movie.actors}
                <br />
                Directors:
                {movie.directors}
              </Typography>
            </CardContent>
          </Card>
          
        </Grid>
      ))}
        <Stack spacing={2}>
      
      <Pagination count={10} page={page} onChange={handleChange} />
      </Stack>
    </>
  )
}

export default CardMovie
