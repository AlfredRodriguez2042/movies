import axios from 'axios'
const authClient = () => {
  return axios.create({
    timeout: 150000,
  })
}

export const getFilterMovies = () => {
  return authClient().get(`http://localhost:4000/api/movies/all`)
}
export const getMovies = (page: number, limit: number, search: string) => {
  const filter = search
    ? `http://localhost:4000/api/movies?limit=${limit}&page=${page}&search=${search}`
    : `http://localhost:4000/api/movies?limit=${limit}&page=${page}`
  return authClient().get(filter)
}
//http://localhost:4000/api/movies?limit=5&page=1
export const createMovies = (input: any) => {
  let formData = new FormData()
  formData.append('file', input)
  return authClient().post(`http://localhost:4000/api/movies/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
export const updateMovie = (id: string) => {
  return authClient().put(`http://localhost:4000/api/movies/${id}`)
}

export const deleteMovies = (id: string) => {
  return authClient().delete(`http://localhost:4000/api/movies/${id}`)
}
