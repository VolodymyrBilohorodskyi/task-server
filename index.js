import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Category from './models/category.js'

const PORT = 3333
const URL = 'mongodb://localhost:27017/task'

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`DB connection error ${err}`))

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listening port ${PORT}`)
})

app.post('/', (req, res) => {
  const category = new Category(req.body)
  category
    .save()
    .then(() => res.json('Category add'))
    .catch((err) => console.log(err))
})

app.get('/', async (req, res) => {
  const category = await Category.find()
    .then((category) => {
      res.status(200).json(category)
    })
    .catch((err) => res.status(500).json(err))
})
