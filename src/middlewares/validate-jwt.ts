import jwt from 'jsonwebtoken'
import boom from '@hapi/boom'
import { ControllerNext, PayloadJWT } from '../types'
import AdminServices from '../services/admin.services'
const adminServices = new AdminServices()

const validateJWT: ControllerNext = async (req, _res, next) => {
  const token = req.header('x-token')

  if (token == null) return next(boom.badRequest('Missing Token'))

  try {
    const { name } = jwt.verify(token, process.env.SECRETORPRIVATEKEY as string) as PayloadJWT

    const admin = adminServices.getAdminInfo()
    if (admin.name !== name) {
      return next(boom.unauthorized('Invalid Token'))
    }

    next()
  } catch (error) {
    next(boom.unauthorized('Invalid Token'))
  }
}

export default validateJWT
