const express= require('express')

//controller functions
//or do const destructure require

const {loginUser,signupUser}=require('../controllers/userController')

const router = express.Router()

//login route  request handler function: ()=>{}
//                      l
//                      v
router.post('/login',loginUser)

//signup route
router.post('/signup',signupUser)

module.exports= router