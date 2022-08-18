import { check } from 'express-validator'
import validateFields, { validateUpdateParameters } from '../middlewares/validate-fields'
import { Status } from '../enums'

export const validateUserCreation = [
  check('name', 'Wrong or missing name').notEmpty().isString(),
  check('startDate', 'Wrong or missing startDate').notEmpty().isDate(),
  check('endDate', 'Wrong or missing endDate').notEmpty().isDate(),
  check('status', `Wrong or missing status - ${Object.values(Status).join(', ')}`).notEmpty().isIn(Object.values(Status)),
  check('payment', 'Wrong or missing payment').notEmpty().isNumeric().not().isString().isInt({ min: 0 }),
  validateFields
]

export const validateUpdateUser = [
  validateUpdateParameters,
  check('name', 'Wrong or missing name').optional().notEmpty().isString(),
  check('startDate', 'Wrong or missing startDate').optional().notEmpty().isDate(),
  check('endDate', 'Wrong or missing endDate').optional().notEmpty().isDate(),
  check('status', `Wrong or missing status - ${Object.values(Status).join(', ')}`).optional().notEmpty().isIn(Object.values(Status)),
  check('payment', 'Wrong or missing payment').optional().notEmpty().isNumeric().not().isString().isInt({ min: 0 }),
  validateFields
]

export const validateFilters = [
  check('rut', 'Wrong or missing rut').optional().isNumeric(),
  check('pageNumber', 'Wrong or missing pageNumber').optional().isInt({ min: 1 }),
  check('pageSize', 'Wrong or missing pageSize').optional().isInt({ min: 1 }),
  check('from', 'Wrong or missing from').optional().isInt({ min: 1 }),
  check('to', 'Wrong or missing to').optional().isInt({ min: 1 }),
  check('startDate', 'Wrong or missing startDate').optional().isDate(),
  check('endDate', 'Wrong or missing endDate').optional().isDate(),
  check('status', `Wrong or missing status - ${Object.values(Status).join(', ')}`).optional().isIn(Object.values(Status)),
  validateFields
]

export const validateId = [
  check('id', 'Wrong or missing id').notEmpty().isInt({ min: 1 }),
  validateFields
]
