import express from 'express'
import { ProductModel } from '../models/products.model.js'

const router = express.Router()

router.get('/', async (request, response) => {
  try {
    return response.status(200).json(await ProductModel.find())
  } catch (error) {
    console.log(error)
    return response.status(500).json({ msg: 'something is wrong' })
  }
})

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params

    return response.status(200).json(await ProductModel.findById(id))
  } catch (error) {
    console.log(error)

    return response.status(500).json({ msg: 'something is wrong' })
  }
})

router.post('/', async (request, response) => {
  try {
    return response.status(201).json(await ProductModel.create(request.body))
  } catch (error) {
    console.log(error)
    return response.status(500).json({ msg: 'something is wrong' })
  }
})

router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params

    return response.status(200).json(
      await ProductModel.findByIdAndUpdate(
        id,
        { ...request.body },
        { new: true, runValidators: true }
      )
    )
  } catch (error) {
    console.log(error)
    return response.status(500).json({ msg: 'something is wrong' })
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params

    return response.status(200).json(await ProductModel.findByIdAndDelete(id))
  } catch (error) {
    console.log(error)
    return response.status(500).json({ msg: 'something is wrong' })
  }
})

export default router
