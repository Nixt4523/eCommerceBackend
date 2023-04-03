// Importing packages
const express = require('express')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const { getUserCart, getAllUsersCart, createUserCart, updateUserCart, deleteUserCart } = require('../controllers/cartControllers')

// Initializing Router
const router = express.Router()

// Get User Cart
router.get('/find/:userId', verifyTokenAndAuthorization, getUserCart)

// Get All Users Cart
router.get('/', verifyTokenAndAdmin, getAllUsersCart)

// Creating Cart for User
router.post('/', verifyToken, createUserCart)

// Updating User Cart
router.put('/:cartId', verifyTokenAndAuthorization, updateUserCart)

// Deleting the User Cart
router.delete('/:cartId', verifyTokenAndAuthorization, deleteUserCart)

module.exports = router