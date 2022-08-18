import express, { Application } from 'express'
import cors from 'cors'

import usersRoutes from '../routes/users.routes'
import adminRoutes from '../routes/admin.routes'

import { errorHanlder, logErrors, error404, boomErrorHandler, errorsListHandler } from '../middlewares/error.handler'
import validateExpiredUsers from '../middlewares/validateExpiredUsers'

class Server {
  private readonly app: Application
  private readonly port: string
  private readonly paths = {
    base: '/api',
    users: '/users',
    admin: '/admin'
  }

  constructor () {
    this.port = process.env.PORT ?? '8080'
    this.app = express()

    this.middlewares()
    this.routes()
  }

  middlewares (): void {
    this.app.use(validateExpiredUsers)
    this.app.use(express.json(), cors())
  }

  routes (): void {
    this.app.use(this.paths.base + this.paths.admin, adminRoutes)
    this.app.use(this.paths.base + this.paths.users, usersRoutes)

    this.app.use(logErrors)
    this.app.use(error404)
    this.app.use(errorsListHandler)
    this.app.use(boomErrorHandler)
    this.app.use(errorHanlder)
  }

  listen (): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

export default Server
