import { Application, Router } from 'express'
import fs from 'fs'

const router = Router()

export const route = (app: Application) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.ts') return
    const name = file.split('.')[0]
    const route = require(`./${file}`)
    router.use(`/${name}`, route)
  })
  app.use('/api', router)
}
