// Importing packages
const express = require('express')
const { verifyTokenAndAdmin } = require('./verifyToken')
const { getSingleProduct, getAllProducts, createNewProduct, updateProduct, deleteProduct } = require('../controllers/productControllers')

// Initializing Router
const router = express.Router()

// Get Single Product 
router.get('/find/:productId', getSingleProduct)

// Get all Products
router.get('/', getAllProducts)

// Create new Product
router.post('/', verifyTokenAndAdmin, createNewProduct)

// Updating Product 
router.put('/:productId', verifyTokenAndAdmin, updateProduct)

// Delete Product 
router.delete('/:productId', verifyTokenAndAdmin, deleteProduct)

module.exports = router