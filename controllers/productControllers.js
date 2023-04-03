const Products = require('../models/Products')

// Get Single Product
exports.getSingleProduct = async (req, res) => {

    // Finding product in the Database
    const product = await Products.findById(req.params.productId)

    if (!product) {
        res.status(404).json('Product does not Exists..!')
    }
    else {
        try {

            res.status(200).json(product)

        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}

// Get All Products
exports.getAllProducts = async (req, res) => {

    // Cheking for queries
    const queryNew = req.query.newProducts
    const queryCategory = req.query.category

    try {
        // Creating products Array 
        let products

        if (queryNew) {
            // Getting all New Products if there is query for newProducts 
            products = await Products.find().sort({ createdAt: -1 }).limit(5)
        }
        else if (queryCategory) {
            // Getting all Products with queryCategory if there is query for category 
            products = await Products.find({
                categories: {
                    $in: [queryCategory]
                }
            })
        }
        else {
            // Getting all Products if there are no queries
            products = await Products.find()
        }
        res.status(200).json(products)
    }
    catch (err) {
        res.status(500).json(err)
    }

}

// Create New Product
exports.createNewProduct = async (req, res) => {

    // Checking if there in no product in the Req Body
    if (!req.body) {
        res.status(400).json('Invalid Product Details..!')
    }

    // Creating new Product in Database
    const newProduct = new Products(req.body)

    try {

        // Saving the Product in the Database
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)

    }
    catch (err) {
        res.status(500).json(err)
    }
}

// Update Product
exports.updateProduct = async (req, res) => {

    const product = await Products.findById(req.params.productId)

    // Checking Req Body for Product details or Product exists in Database  
    if (!req.body || !product) {
        res.status(400).json('Invalid Product Details or Product ID..!')
    }
    else {
        try {

            // Updating the Product in the Database 
            const updatedProduct = await Products.findByIdAndUpdate(
                req.params.productId,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            )

            res.status(200).json(updatedProduct)

        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}

exports.deleteProduct = async (req, res) => {

    // Finding the Product in the Database
    const product = await Products.findById(req.params.productId)

    if (!product) {
        res.status(404).json('Product does not Exists..!')
    }
    else {
        try {

            //Deleting the Product
            await Products.findByIdAndDelete(req.params.productId)

            res.status(200).json('Product has been deleted..!')
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}