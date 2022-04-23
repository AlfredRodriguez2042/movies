import { QueryOptions, Document } from 'mongoose'
import { MovieEntity } from '../Entities/Movie'
import { BaseRepository } from './BaseRepository'

interface IMovie extends Document {
  title: string
  category: string[]
  year: number
  director: string
  actor: string
}

class MovieRepository extends BaseRepository<IMovie> {
  constructor() {
    super(MovieEntity)
  }

  async findAll(limit = 10, page = 1, query: any): Promise<any> {
    const filter = query ? { title: query } : {}

    const options: QueryOptions = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      lean: true,
    }
    const Movies = MovieEntity.paginate(filter, options)
    return Movies
  }

  async findByTitle(title: string) {
    const Movie = await MovieEntity.findOne({ title })
    return Movie
  }
}

export default new MovieRepository()
