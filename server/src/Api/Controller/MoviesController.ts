import { Response, Request } from 'express'
import MovieRepository from '@Repositories/MovieRepository'
import fs from 'fs'
import csv from 'csv-parser'
import {
  //DataExist,
  NoContent,
  NotFound,
  Ok,
  throwDBError,
  to,
} from '../Utils/HttpStatus'

class MovieController {
  async findAll(req: Request, res: Response) {
    const { query } = req
    const filter = query.search
    const limit = Number(query.limit)
    const page = Number(query.page)
    const [err, Movies] = await to(MovieRepository.findAll(limit, page, filter))

    if (err) {
      throwDBError(err)
    }
    if (!Movies) {
      return NotFound(res)
    }
    if (Movies.docs.length ===0) {
      return NoContent(res)
    }
    return Ok(res, Movies)
  }
  async find(_req:any,res:any){
   const movies= await MovieRepository.getAll()
  
   return Ok(res, movies)
  }
  async create(req: any, res: Response) {
    const fileMovies:any=[]
    fs.createReadStream(req.file.path)
    .pipe(csv({ separator:";" }))
    .on('error', error => console.error(error))
    .on('data', row => fileMovies.push({
      title:row.titulo,
      caregory:row.genero,
      year:row.año,
      directors:row.director,
      actors:row.actores
    }))
    .on('end', () => {
  const result=  Promise.all( fileMovies.map( async data=>{
        const movieExist = await MovieRepository.findByTitle(data.title)
         if (!movieExist) {
           const [err, Movies] = await to(MovieRepository.create(data))
           
           if (err) {
             return throwDBError(err)
            }
            return Movies
          }
         
        }))
        res.send(result)
    });
  
  }
  async update(req: Request, res: Response) {
    const id:any = req.params.id
    const [err,Movies] = await to(MovieRepository.update(id, req.body))
    if (err) {
      return throwDBError(err)
     } 
     if (!Movies) {
       return NotFound(res)
     }
     return Ok(res, Movies)
    
  }
  async delete(req: Request, res: Response) {
    const [err,Movies] = await to(MovieRepository.delete(req.body.id))
    if (err) {
      return throwDBError(err)
     }
     if (!Movies) {
       return NotFound(res)
     }
     return Ok(res, Movies)
  }
}
export default new MovieController()
