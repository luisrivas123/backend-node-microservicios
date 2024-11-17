// const db = {
//   user: [
//     { id: '1', name: 'Carlos' },
//     { id: '2', name: 'Luis' }
//   ]
// }

export class Store {
  constructor() {
    this.db = {
      user: [
        { id: '1', name: 'Carlos' },
        { id: '2', name: 'Luis' }
      ]
    }
  }

  list = async (tabla) => {
    return this.db[tabla] || []
  }

  getById = async (tabla, id) => {
    let col = await this.list(tabla)
    return col.filter((item) => item.id === id)[0] || null
  }

  upsert = async (tabla, data) => {
    if (!this.db[tabla]) {
      this.db[tabla] = []
    }
    this.db[tabla].push(data)

    // console.log(this.db)
    return data
  }

  remove = async (tabla, id) => {
    let table = await this.list(tabla)
    let index = table.indexOf(id)
    return table.splice(index + 1, 1)
  }

  query = async (tabla, q) => {
    let col = await list(tabla)
    let keys = Object.keys(q)
    let key = keys[0]

    return col.filter((item) => item[key] === q[key])[0] || null
  }
}
