import { nanoid } from 'nanoid'

const TABLA = 'user'
// const store = new Store()

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

  upsert = (body) => {
    const user = {
      name: body.name
    }

    if (body.id) {
      user.id = body.id
    } else {
      user.id = nanoid()
    }

    return this.store.upsert(TABLA, user)
  }

  remove = (id) => {
    return this.store.remove(TABLA, id)
  }
}
