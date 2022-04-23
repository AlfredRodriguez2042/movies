import { Document, FilterQuery, Model, Types } from 'mongoose'

export class BaseRepository<T extends Document> {
  private _model: Model<T>

  constructor(Repository: any) {
    this._model = Repository
  }

  private toObjectId(id: Types.ObjectId) {
    return Types.ObjectId.isValid(id) ? id : null
  }

  async getAll() {
    return await this._model.find()
  }

  async getById(id: string) {
    return await this._model.findById(id)
  }

  async create(input: any) {
    return await this._model.create(input)
  }

  async update(id: Types.ObjectId, input: any) {
    const options = {
      new: true,
      // rawResult: true,
    }
    return await this._model.findByIdAndUpdate(
      id as FilterQuery<T>,
      input,
      options
    )
  }

  async delete(id: Types.ObjectId) {
    this.toObjectId(id)
    return await this._model.findByIdAndRemove(id)
  }
}