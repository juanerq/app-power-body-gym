import boom from '@hapi/boom'
import { validationResult } from 'express-validator'
import { ControllerNext } from '../types'

const validateFields: ControllerNext = (req, _res, next): any => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(errors.array())
  }
  next()
}

export const validateUpdateParameters: ControllerNext = (req, _res, next) => {
  const parameters = req.body
  if (Object.keys(parameters).length === 0) {
    throw boom.badData('Missing information to update')
  }
  next()
}

export default validateFields
