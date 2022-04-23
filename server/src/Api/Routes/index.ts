import { Router } from 'express'
import Movies from './peliculas.router'

const router = Router()

router.use('/movies',Movies)
// export const route = (app: Application) => {
//   fs.readdirSync(__dirname).forEach((file) => {
//     if (file === 'index.ts') return
//     const name = file.split('.')[0]
//     const route = require(`./${file}`)
//     router.use(`/${name}`, route)
//   })
//   app.use('/api', router)
// }

export default router