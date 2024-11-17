import { nanoid } from 'nanoid'
import { AuthController } from '../auth/controller.js'
import { Store } from '../../../store/dummy.js'

const store = new Store()
const TABLA = 'user'
// const store = new Store()

const auth = new AuthController(store)

export class UserController {
  constructor(store) {
    this.store = store
  }

  list = () => {
    return this.store.list(TABLA)
  }

  getById = (id) => {
    return this.store.getById(TABLA, id)
  }

  upsert = async (body) => {
    const user = {
      name: body.name,
      username: body.username
    }

    if (body.id) {
      user.id = body.id
    } else {
      user.id = nanoid()
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password
      })
    }

    return this.store.upsert(TABLA, user)
  }

  remove = (id) => {
    return this.store.remove(TABLA, id)
  }
}
