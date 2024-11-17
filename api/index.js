import express, { json } from 'express'
import { serve, setup } from 'swagger-ui-express'
import { createUserRouter } from './components/user/network.js'
import { createAuthRouter } from './components/auth/network.js'
import { errors } from '../network/errors.js'
import { Store } from '../store/dummy.js'
import { MySQLStore } from '../store/mysql.js'
// import { MongoStore } from '../store/mongo.js'

import swaggerDoc from './swagger.json' assert { type: 'json' }

const app = express()
app.use(json())

const PORT = process.env.PORT ?? 4000

// Decide qué base de datos usar
// const store = process.env.DB_TYPE === 'mongo' ? new MongoStore() : new Store()
const store = new MySQLStore()

// Pasa la base de datos al router
const userRouter = createUserRouter(store)
const authRouter = createAuthRouter(store)

app.get('/', (req, res) => {
  res.send('<h1>Server up</h1>')
})

app.use('/api/user', userRouter)
app.use('/api/login', authRouter)
app.use('/api-docs', serve, setup(swaggerDoc))

app.use(errors)

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
