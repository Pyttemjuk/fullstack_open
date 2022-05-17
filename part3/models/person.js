const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: [true, 'name is required'] },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: (v) => {
        if (v.includes('-')) {
          return /^\d{2,3}-\d*$/.test(v)
        } else {
          return /\d{8}\d*$/.test(v)
        }
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: [true, 'phone number is required'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
