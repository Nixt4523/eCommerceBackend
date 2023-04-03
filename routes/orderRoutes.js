// Importing packages
const express = require('express')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const { getUserOrders, createNewOrder, updateUserOrder, getAllOrders, deleteOrder } = require('../controllers/orderControllers')


// Initializing Router
const router = express.Router()

// Get User Orders
router.get('/find/:userId', verifyTokenAndAuthorization, getUserOrders)

// Get All Orders
router.get('/', verifyTokenAndAdmin, getAllOrders)

// Create New Order
router.post('/', verifyToken, createNewOrder)

// Updating Order
router.put('/:orderId', verifyTokenAndAdmin, updateUserOrder)

// Delete Order
router.delete('/:orderId', verifyTokenAndAdmin, deleteOrder)

module.exports = router