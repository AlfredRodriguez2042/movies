import express, { Application, json, urlencoded } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import route from '@Routes/index'
import cookieParser from 'cookie-parser'
//import fielUpload from 'express-fileupload'
import cors  from 'cors'
//import * as expressSwagger from 'express-swagger-generator'
export class Server {
  private app: Application
  private path: any = process.env.BACKEND_PORT || 4000
  public swaggerObject: any
  constructor() {
    this.app = express()
    this.swaggerObject = require('express-swagger-generator')(this.app)
    this.middlewares()
    this.buildApiDocs()
    this.routes()
  }

  private async routes() {
    this.app.use('/api',route)

  }
  private async middlewares() {
    this.app.enable('trust proxy')
    this.app.use(compression())
    this.app.use(
      helmet({
        contentSecurityPolicy:
          process.env.NODE_ENV === 'production' ? undefined : false,
      })
    )
    this.app.use(urlencoded({ extended: true }))
   // this.app.use(fielUpload())
    this.app.use(json())
    this.app.use(cors())
    this.app.use(cookieParser())
  }
  private buildApiDocs() {
    this.swaggerObject({
      swaggerDefinition: {
        info: {
          description: 'REST API service for DB masters',
          title: 'app peliculas',
          version: '1.0.0',
        },
        host: 'localhost:4000',
        basePath: `/v1`,
        produces: ['application/json'],
        schemes: ['http', 'https'],
        securityDefinitions: {
          JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: '',
          },
        },
      },
      //   route: {
      //     url: `${this.path}/api-docs`,
      //     docs: `${this.path}/api-docs.json`,
      //   },
      basedir: process.cwd(),
      files: [`./src/Api/routes/**/*.js`, `./src/Api/**/*.ts`],
    })
  }

  public start() {
    this.app.listen(this.path, () => {
      try {
        console.log(`Express server is running on port ${this.path}`)
      } catch (error) {
        console.log(error)
      }
    })
  }
}
