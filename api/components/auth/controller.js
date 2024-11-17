import bcrypt from 'bcrypt'

import { sign } from '../../../auth/index.js'
const TABLA = 'auth'

export class AuthController {
  constructor(store) {
    this.store = store
  }

  login = async (username, password) => {
    const data = await this.store.query('user', { username: username })
    console.log(data)

    const isValid = await bcrypt.compare(password, data.password)

    if (!isValid || !data) {
      throw new Error('Información Invalida')
    }

    const token = sign(data)

    return token
  }

  upsert = async (data) => {
    const authData = {
      id: data.id
    }

    if (data.username) {
      authData.username = data.username
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5)
    }

    return this.store.upsert(TABLA, authData)
  }
}
