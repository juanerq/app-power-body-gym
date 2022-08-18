import { check } from 'express-validator'
import validateFields from '../middlewares/validate-fields'

export const validateUpdateAdminPassword = [
  check('password', 'Password is not valid').isString().isLength({ min: 4 }),
  validateFields
]
