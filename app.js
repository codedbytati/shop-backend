import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import userRouter from './routes/users.routes.js'
import productRouter from './routes/products.routes.js'

dotenv.config()

const app = express()

app.use(cors({ origin: process.env.REACT_URL }))
app.use(express.json())

app.use('/user', userRouter)
app.use('/products', productRouter)

app.listen((process.env.PORT), () =>
  console.log(`server on port ${process.env.PORT}!`)
)