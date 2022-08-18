import express from 'express'
import AdminController from '../controllers/admin.controller'
import AuthController from '../controllers/auth.controller'
import validateJWT from '../middlewares/validate-jwt'
import { validateUpdateAdminPassword } from '../validators/admin.validators'
const router = express.Router()

const adminController = new AdminController()
const authController = new AuthController()

router.route('/login')
  .post(authController.login)

router.route('/')
  .put(validateJWT, validateUpdateAdminPassword, adminController.changePassword)

export default router
