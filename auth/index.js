import jwt from 'jsonwebtoken'
import { error } from '../utils/error.js'

const SECRET = process.env.SECRET

export const sign = (data) => {
  return jwt.sign(data, SECRET)
}

const verify = (token) => {
  return jwt.verify(token, SECRET)
}

export const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req)
  }
}

const getToken = (auth) => {
  if (!auth) {
    throw error('No viene token', 401)
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw error('Formato invalido', 401)
  }

  let token = auth.replace('Bearer ', '')
  return token
}

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || ''
  const token = getToken(authorization)
  const decoded = verify(token)

  req.user = decoded

  return decoded
}
