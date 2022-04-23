import { Schema, model,Document} from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { IPagination } from './Paginate'
interface Imovie extends Document{
    title:string
    category:string
    year:string
    director:string
    actor:string
}

const MovieSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  category: { type: String },
  year: {
    type:String,
  },
  directors:  { type: String },
  actors:  { type: String },
})

MovieSchema.plugin(paginate)
export const MovieEntity:IPagination<Imovie>= model<Imovie,IPagination<Imovie>>('Movie',MovieSchema)