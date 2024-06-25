import express from 'express'
import bcrypt from 'bcrypt'

import generateToken from '../config/jwt.config.js'
import { UserModel } from '../models/users.model.js'

const router = express.Router()
const rounds = 10

router.get('/:id', async (request, response) => {
  try {
  const { id } = request.params
  const user = await UserModel.find(id)

  if(!user) {
    return response.status(404).json('no user found')
  }

  return response.status(200).json(user)
  } catch(error) {
    console.log(error)
    return response.status(500).json({ msg: 'something is wrong'})
  }
})

router.post('/register', async (request, response) => {
  try {
    const { password } = request.body

    if (!password) {
      return response.status(400).json({ msg: 'senha não foi inserida' })
    }

    const saltString = await bcrypt.genSalt(rounds)
    const hashPassword = await bcrypt.hash(password, saltString)

    const user = await UserModel.create({
      ...request.body,
      password: hashPassword,
    })

    delete user._doc.password

    return response.status(201).json(user)
  } catch (error) {
    console.log(error)
    return response.status(500).json({ msg: 'unable to register user' })
  }
})

router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body

    const user = await UserModel.findOne({ email: email })

    if (!user) {
      return response.status(400).json({ msg: 'password or email incorrect' })
    }

    if (await bcrypt.compare(password, user.password)) {
      delete user._doc.password
      const token = generateToken(user)

      return response.status(200).json({
        user: { ...user._doc },
        token: token,
      })
    } else {
      return response.status(401).json({ msg: 'password or email incorrect' })
    }
  } catch (error) {
    console.log(error)
    return response.status(500).json({ msg: 'unable to log in user' })
  }
})

export default router