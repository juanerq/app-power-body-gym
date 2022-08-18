import bcrypjs from 'bcryptjs'
import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import AdminServices from '../services/admin.services'
import generateJwt from '../helper/generateJWT'
const adminServices = new AdminServices()

export default class AuthController {
  async login (req: Request, res: Response, next: NextFunction): Promise<void> {
    const password = req.body?.password

    try {
      if (password == null) next(boom.badRequest('Password is missing'))

      const admin = adminServices.getAdminInfo()

      const validPassword = bcrypjs.compareSync(password, admin.password)
      if (!validPassword) next(boom.unauthorized('Password is not correct'))

      const token = await generateJwt({ name: admin.name })

      res.json({ msg: 'Login ok', token })
    } catch (error) {
      next(error)
    }
  }
}
