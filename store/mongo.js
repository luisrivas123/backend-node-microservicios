import { MongoClient } from 'mongodb'

export class MongoStore {
  constructor() {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017'
    this.client = new MongoClient(uri)
    this.dbName = 'myDatabase'
  }

  list = async (table) => {
    const db = this.client.db(this.dbName)
    const collection = db.collection(table)
    return collection.find({}).toArray()
  }
}
