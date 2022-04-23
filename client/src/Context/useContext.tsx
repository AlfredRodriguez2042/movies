import React, { createContext, useEffect, useReducer } from 'react'
import { getFilterMovies, getMovies } from '../Services/MovieService'
import {
  GET_MOVIES,
  GET_SEARCH_MOVIE,
  IMovieState,
  INITIAL_SEARCH,
  MovieReducer,
} from './MovieReducer'

type QueryProps = {
  limit: number
  page: number
  search?: string
}
type IProvider = {
  state: IMovieState
  getAllMovies: (query: QueryProps) => void
  seachMovies: (query: any) => void
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const movieContext = createContext<IProvider>({} as IProvider)

const MovieProvider = ({ children }: Props) => {
  const INITIAL_STATE: IMovieState = {
    movies:[],
    limit: 10,
    page: 1,
    search: [],
    filter: [],
    errorMessage: null,
  }

  const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE)

  const seachMovies = (search: any) => {
    dispatch({
      type: GET_SEARCH_MOVIE,
      payload: search,
    })
  }

      const initalSeach= async()=>{
       const data=await  getFilterMovies()
       dispatch({
         type:INITIAL_SEARCH,
         payload:data.data
       })
      }

  const getAllMovies = async (query: QueryProps) => {
    const { page, limit, search } = query
    const data = await getMovies(page, limit, search as string)
    console.log(data.data)
    dispatch({
      type: GET_MOVIES,
      payload: data.data,
    })
  }
useEffect(()=>{
  getAllMovies({limit:10,page:1})
 initalSeach()
},[])
  return (
    <movieContext.Provider value={{ state, getAllMovies,seachMovies }}>
      {children}
    </movieContext.Provider>
  )
}

export default MovieProvider
