const Cart = require('../models/Cart')

// Get User Cart
exports.getUserCart = async(req, res)=>{
    
    // Checking if there is User Id in the Params
    if(!req.params.userId){
        res.status(400).json('Invalid user Id')
    }
    else{

        try{

            // Finding Cart by User Id in the Database
            const cart = await Cart.findOne({userId : req.params.userId})
            res.status(200).json(cart)

        }
        catch(err){
            res.status(500).json(err)
        }
        
    }
}

// Get All User's Cart
exports.getAllUsersCart = async(req, res)=>{

    try{

        // Getting all Carts in Database
        const carts = await Cart.find()
        res.status(200).json(carts)

    }
    catch(err){
        res.status(500).json(err)
    }
}

// Create New Cart for User
exports.createUserCart = async (req, res) => {

    // Checking if the Req Body Exists
    if (!req.body) {
        res.status(400).json('Invalid Cart Details..!')
    }
    else {

        // Creating new Cart in the Database
        const newCart = new Cart(req.body)

        try {
            // Saving new Cart in the Databse
            const savedCart = await newCart.save()
            res.status(200).json(savedCart)

        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}

// Update User Cart
exports.updateUserCart = async (req, res) => {

    // Finding Cart in Database
    const cart = await Cart.findById(req.params.cartId)

    // Checking Req Body for Cart details or Cart exists in Database 
    if (!req.body || !cart) {
        res.status(400).json('Invalid Cart Details or Cart ID..!')
    }
    else {
        try {

            // Updating the Cart in the Database
            const updateCart = await Cart.findByIdAndUpdate(
                req.params.cartId,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            )

            res.status(200).json(updateCart)

        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}

// Deleting User Cart
exports.deleteUserCart = async (req, res) => {

    // Finding Cart in Database
    const cart = await Cart.findById(req.params.cartId)

    // Checking if Cart exists in Database 
    if (!cart) {
        res.status(404).json('Cart does not Exists..!')
    }
    else{
        try{

            // Deleting Cart in the Database
            await Cart.findByIdAndDelete(req.params.cartId)
            res.status(200).json('Cart has been Deleted..!')

        }
        catch(err){
            res.status(500).json(err)
        }
    }

}