import { Router } from 'express'
import { Response } from '../../../network/response.js'
import { AuthController } from './controller.js'

export const createAuthRouter = (store) => {
  const authRouter = Router()
  const response = new Response()
  const authController = new AuthController(store)

  authRouter.post('/', async (req, res) => {
    // const input = req.body
    try {
      const token = await authController.login(
        req.body.username,
        req.body.password
      )
      response.success(req, res, token, 200)
    } catch (err) {
      response.error(req, res, 'Failed login', 400)
    }
  })

  return authRouter
}
