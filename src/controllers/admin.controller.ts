import { NextFunction, Request, Response } from 'express'
import Utils from '../utils/utils'
import bcrypt from '../helper/bcrypt'
import AdminServices from '../services/admin.services'
const adminServices = new AdminServices()

export default class AdminController {
  changePassword (req: Request, res: Response, next: NextFunction): void {
    const { password } = req.body

    const newPassword = {
      password: bcrypt(password)
    }

    const { result, error } = Utils.to(() => adminServices.update(newPassword))
    if (error != null) return next(error)

    res.status(200).json({ msg: result })
  }
}
