import { Router } from 'express'
import { checkAuth } from './secure.js'
import { Response } from '../../../network/response.js'
import { UserController } from './controller.js'

export const createUserRouter = (store) => {
  const userRouter = Router()
  const response = new Response()
  const userController = new UserController(store)

  const list = async (req, res) => {
    try {
      const list = await userController.list()
      response.success(req, res, list, 200)
    } catch (err) {
      response.error(req, res, 'Failed to fetch user list', 500)
    }
  }

  const getById = async (req, res) => {
    const id = req.params.id
    try {
      const user = await userController.getById(id)
      response.success(req, res, user, 200)
    } catch (err) {
      response.error(req, res, 'Failed to fetch user list', 500)
    }
  }

  const create = async (req, res) => {
    const input = req.body
    try {
      const user = await userController.upsert(input)
      response.success(req, res, user, 200)
    } catch (err) {
      response.error(req, res, 'Failed to fetch user list', 500)
    }
  }

  const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
      const user = await userController.remove(id)
      response.success(req, res, user, 200)
    } catch (err) {
      response.error(req, res, 'Failed to fetch user list', 500)
    }
  }

  userRouter.get('/', list)
  userRouter.get('/:id', checkAuth('update'), getById)
  userRouter.post('/', create)
  userRouter.put('/', create)
  userRouter.delete('/:id', deleteUser)

  return userRouter
}
