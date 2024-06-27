import { Schema, model } from 'mongoose'

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String
    }
  },
  {
    timestamps: true,
  }
)

export const ProductModel = model('Product', productSchema)