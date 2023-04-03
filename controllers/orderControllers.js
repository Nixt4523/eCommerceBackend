const Order = require('../models/Order')

// Get User Orders
exports.getUserOrders = async (req, res) => {

    // Checking if there is User Id in the Params
    if (!req.params.userId) {
        res.status(400).json('Invalid user Id')
    }
    else {

        try {

            // Finding Order by User Id in the Database
            const orders = await Order.find({ userId: req.params.userId })
            res.status(200).json(orders)

        }
        catch (err) {
            res.status(500).json(err)
        }

    }
}

// Get All Orders
exports.getAllOrders = async (req, res) => {

    try {

        // Getting all Orders in Database
        const orders = await Order.find()
        res.status(200).json(orders)

    }
    catch (err) {
        res.status(500).json(err)
    }

}

// Create New Order
exports.createNewOrder = async (req, res) => {

    // Creating New Order in the Database
    const newOrder = new Order(req.body)

    try {

        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)

    }
    catch (err) {
        res.status(500).json(err)
    }
}

// Update User Order
exports.updateUserOrder = async (req, res) => {

    // Finding Order in Database
    const order = await Order.findById(req.params.orderId)

    // Checking Req Body for Order details or Order exists in Database 
    if (!req.body || !order) {
        res.status(400).json('Invalid Order Details or Order ID..!')
    }
    else {

        try {

            // Updating Order in the Database
            const updateOrder = await Order.findByIdAndUpdate(
                req.params.orderId,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            )

            res.status(200).json(updateOrder)

        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}

// Delete Order
exports.deleteOrder = async (req, res) => {

    // Checking if Order Exists in Database
    if (!req.params.orderId) {
        res.status(404).json('Invalid Order Id..!')
    }
    else {
        try {
            // Finding Order in Database
            const order = await Order.findById(req.params.orderId)

            if (!order) {
                res.status(404).json('Order does not Exists..!')
            }
            else {

                // Deleting Order in the Database
                await Order.findByIdAndDelete(req.params.orderId)
                res.status(200).json('Order has been Deleted..!')

            }

        }
        catch (err) {
            res.status(500).json(err)
        }
    }

}