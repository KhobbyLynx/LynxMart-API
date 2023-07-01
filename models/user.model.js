import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema(
   {
      name: {
         type: String,
         required: [true, 'Please add a name'],
      },
      gender: {
         type: String,
         required: [true, 'Select your gender'],
      },
      DOB: {
         type: String,
         required: [true, 'Please add your Date of birth'],
      },
      phone: {
         type: Number,
         required: [true, 'Please add your Phone Number'],
         unique: true,
      },
      email: {
         type: String,
         required: [true, 'Please add an email'],
         unique: true,
      },
      password: {
         type: String,
         required: [true, 'Please add a password'],
      },
   },
   {
      timestamps: true,
   }
)

export default mongoose.model('User', userSchema)
