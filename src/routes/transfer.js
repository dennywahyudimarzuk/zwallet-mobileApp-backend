const router = require('express').Router()
const transferController = require('../controllers/transfer')
const { authentication } = require('../middlewares/auth')

router
    .get('/history/all', authentication, transferController.getAllHistoryUser)
    .get('/history', authentication, transferController.getHistoryUser)
    .get('/history/today', authentication, transferController.getHistoryToday)
    .get('/history/filter', authentication, transferController.getHistoryByFilter)
    .post('/', authentication, transferController.postTransfer)

module.exports = router