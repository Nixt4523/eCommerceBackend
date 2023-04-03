const cryptoJs = require('crypto-js')
const User = require('../models/User')

// Get Single User Details
exports.getUserDetails = async (req, res) => {

    try {
        const user = await User.findById(req.params.userId)

        const { password, ...otherDetails } = user._doc

        res.status(200).json(otherDetails)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getAllUsersDetail = async (req, res) => {

    // Checking for Query ot find new Users in the Database 
    const querry = req.query.newUsers

    try {
        const users = querry ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()

        res.status(200).json(users)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.updateUserDetails = async (req, res) => {

    // Checking if User is updating the Password
    if (req.body.password) {
        
        // Encrypting the new Password again 
        req.body.password = cryptoJs.AES.encrypt(
            req.body.password,
            process.env.CRYPTOJS_KEY
        ).toString()
    }

    try {

        // Finding User in Database and Updating the User with new Details
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,
            {
                $set: req.body
            },
            {
                new: true,
            }
        )

        res.status(200).json(updatedUser)
    }
    catch (err) {
        res.status(500).json(err)
    }

}

exports.deleteUser = async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.userId)
        if (!user) {
            res.status(404).json('User does not Exists..!')
        }
        else {
            res.status(200).json('User has been Deleted..!')
        }

    }
    catch (err) {
        res.status(500).json(err)
    }

}
