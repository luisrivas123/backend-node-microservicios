import { Response } from './response.js'

const response = new Response()

export const errors = (err, req, res, next) => {
  console.error('[error]', err)

  const message = err.message || 'Error interno'
  const status = err.statusCode || 500

  response.error(req, res, message, status)
}
