// Importing packages
const express = require('express')
const { getStats } = require('../controllers/statsControllers')
const { verifyTokenAndAdmin } = require('../routes/verifyToken')

// Initializing Router
const router = express.Router()

// Register User
router.get('/',verifyTokenAndAdmin, getStats)

module.exports = router