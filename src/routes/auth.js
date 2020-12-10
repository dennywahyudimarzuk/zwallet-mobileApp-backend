const router = require('express').Router()
const authController = require('../controllers/auth')
const { requiredName, requiredEmail, requiredPassword } = require('../middlewares/validators')

router
    .post('/login', authController.postLogin)
    .post('/register', [requiredName, requiredEmail, requiredPassword], authController.postRegister)
    .patch('/forgot', authController.forgotPassword)

module.exports = router