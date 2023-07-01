import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'

// @desc Register new user
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
 const { name, gender, DOB, phone, email, password } = req.body

 if (!name || !email || !password || !DOB || !phone || !gender) {
  res.status(400)
  throw new Error('Please add all fields')
 }

 //Check if user exists
 const userExists = await User.findOne({ email })

 if (userExists) {
  res.status(400)
  throw new Error('User already exists')
 }

 // Hash Password
 const salt = await bcrypt.genSalt(10)
 const hashedPassword = await bcrypt.hash(password, salt)

 // Create user
 const user = await User.create({
  name,
  gender,
  DOB,
  phone,
  email,
  password: hashedPassword,
 })

 if (user) {
  res.status(201).json({
   _id: user.id,
   name: user.name,
   gender: user.gender,
   DOB: user.DOB,
   phone: user.phone,
   email: user.email,
   token: generateToken(user._id),
  })
 } else {
  res.status(400)
  throw new Error('Invalid user data')
 }
})

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
 const { email, password } = req.body

 //Check for user email
 const user = await User.findOne({ email })

 if (user && (await bcrypt.compare(password, user.password))) {
  res.json({
   _id: user.id,
   name: user.name,
   gender: user.gender,
   DOB: user.DOB,
   phone: user.phone,
   email: user.email,
   token: generateToken(user._id),
  })
 } else {
  res.status(400)
  throw new Error('Invalid user credentials')
 }
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
export const getMe = asyncHandler(async (req, res) => {
 const { _id, name, email, DOB, phone, gender } = await User.findById(
  req.user.id
 )

 res.status(200).json({
  id: _id,
  name,
  email,
  gender,
  phone,
  DOB,
 })
})

export const logout = asyncHandler(async (req, res) => {
 res
  .clearCookie('accessToken', {
   sameSite: 'none',
   secure: true,
  })
  .status(200)
  .send('User has been Logged out.')
})

// Generate JWT
const generateToken = (id) => {
 return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '30d' })
}
