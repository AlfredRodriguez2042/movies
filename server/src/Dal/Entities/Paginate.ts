import { Document, Model } from 'mongoose'

export declare class PaginationModel<T extends Document> {
  totalDocs: number | undefined

  limit: number | undefined

  totalPages: number | undefined

  page: number | undefined

  pagingCounter: number | undefined

  hasPrevPage: boolean | undefined

  hasNextPage: boolean | undefined

  prevPage: number | undefined

  nextPage: number | undefined

  hasMore: boolean | undefined

  docs: T[]
}
export interface IPagination<T extends Document> extends Model<T> {
  paginate(
    query: object,
    options?: any | undefined,
    callback?: any | undefined
  ): Promise<PaginationModel<T> | undefined>
}