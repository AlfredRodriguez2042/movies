import { Response, Request } from 'express'
class MovieController {
  findAll(_req: Request, res: Response) {
    res.send('hello')
  }
}
export default new MovieController()