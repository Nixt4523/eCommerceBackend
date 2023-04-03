// Importing packages
const express = require('express')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const { getUserDetails, getAllUsersDetail, updateUserDetails, deleteUser } = require('../controllers/userControllers')

// Initializing Router
const router = express.Router()

// Get Single User Details
router.get('/find/:userId', verifyTokenAndAdmin, getUserDetails)

// Get All User Details
router.get('/', verifyTokenAndAdmin, getAllUsersDetail)

// Update User Details
router.put('/:userId', verifyTokenAndAuthorization, updateUserDetails)

// Delete User
router.delete('/:userId', verifyTokenAndAuthorization, deleteUser)

module.exports = router