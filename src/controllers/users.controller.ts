import { NextFunction, Request, Response } from 'express'
import { NewUserData } from '../types'
import Utils from '../utils/utils'

import UserServices from '../services/users.services'
import filtersParse from '../helper/filtersParse'
const userServices = new UserServices()

export default class UserController {
  getUsers (req: Request, res: Response, next: NextFunction): void {
    const id: string = req.params?.id

    const filters = filtersParse(req.query)

    const { result, error } = Utils.to(
      () => (id == null)
        ? userServices.getUsers(filters)
        : (isNaN(+id))
            ? userServices.findByName(id)
            : userServices.findById(+id)
    )
    if (error != null) return next(error)

    res.status(200).json(result)
  }

  createUser (req: Request, res: Response, next: NextFunction): void {
    const data = req.body

    const newUser: NewUserData = {
      name: data.name,
      rut: data.rut,
      startDate: new Date(data.startDate).toDateString(),
      endDate: new Date(data.endDate).toDateString(),
      status: data.status,
      payment: data.payment
    }
    const { result, error } = Utils.to(() => userServices.createUser(newUser))
    if (error != null) return next(error)

    res.status(201).json(result)
  }

  updateUser (req: Request, res: Response, next: NextFunction): void {
    const id: string = req.params.id
    const data = req.body

    const { result, error } = Utils.to(() => userServices.updateUser(+id, data))
    if (error != null) return next(error)

    res.status(200).json(result)
  }

  deleteUser (req: Request, res: Response, _next: NextFunction): void {
    const id: string = req.params?.id

    userServices.deleteUser(+id)

    res.status(201).json('User deleted')
  }
}
