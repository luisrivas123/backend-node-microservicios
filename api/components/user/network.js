import { Router } from 'express'
import { Response } from '../../../network/response.js'
import { UserController } from './controller.js'

export const createUserRouter = (store) => {
  const userRouter = Router()
  const userController = new UserController(store)
  const response = new Response()

  userRouter.get('/', async (req, res) => {
    try {
      const list = await userController.list()
      response.success(req, res, list, 200)
    } catch (err) {
      console.error('[Error in GET /users]:', err)
      response.error(req, res, 'Failed to fetch user list', 500)
    }
  })

  userRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
      const user = await userController.getById(id)
      response.success(req, res, user, 200)
    } catch (err) {
      console.error('[Error in GET /users]:', err)
      response.error(req, res, 'Failed to fetch user list', 500)
    }
  })

  userRouter.post('/', async (req, res) => {
    const input = req.body
    try {
      const user = await userController.upsert(input)
      response.success(req, res, user, 200)
    } catch (err) {
      console.error('[Error in GET /users]:', err)
      response.error(req, res, 'Failed to fetch user list', 500)
    }
  })

  userRouter.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
      const user = await userController.remove(id)
      response.success(req, res, user, 200)
    } catch (err) {
      console.error('[Error in GET /users]:', err)
      response.error(req, res, 'Failed to fetch user list', 500)
    }
  })

  return userRouter
}
