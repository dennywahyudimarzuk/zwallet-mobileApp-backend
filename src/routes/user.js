const router = require('express').Router()
const userController = require('../controllers/user')
const { authentication, authorization } = require('../middlewares/auth')
const upload = require('../middlewares/multer')

router
    .get('/search', authentication, userController.searchAll)
    .get('/search/receiver', authentication, userController.searchOneById)
    .get('/search/query', authentication, userController.searchByName)
    .get('/', authentication, authorization, userController.getAllUser)
    .get('/login', authentication, userController.getUserLogin)
    .post('/pin', authentication, userController.checkPin)
    .patch('/', upload, authentication, userController.editUser)
    
module.exports = router