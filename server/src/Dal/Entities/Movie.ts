import { Schema, model } from 'mongoose'

const MovieSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  category: [{ type: String }],
  year: {
    type: String,
  },
  director: {
    type: String,
  },
  actor: {
    type: String,
  },
})
