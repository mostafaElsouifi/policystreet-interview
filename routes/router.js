const express = require('express')
const controller = require('../controllers/controllers')
const router = express.Router()

router.get('/', controller.homePage)

router.post('/search', controller.search)
module.exports = router;