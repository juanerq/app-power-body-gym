import express from 'express'
import UserController from '../controllers/users.controller'
import { validateFilters, validateId, validateUserCreation, validateUpdateUser } from '../validators/users.validators'

const router = express.Router()
const userController = new UserController()

router.route('/:id?')
  .get(validateFilters, userController.getUsers)

router.route('/:id')
  .delete(validateId, userController.deleteUser)
  .put(validateUpdateUser, userController.updateUser)

router.route('/')
  .post(validateUserCreation, userController.createUser)

export default router
