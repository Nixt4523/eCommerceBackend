const User = require("../models/User")
const jwt = require('jsonwebtoken')
const cryptoJs = require('crypto-js')

// Register Controller
exports.registerUser =  async (req, res) => {

    const user = await User.findOne({ email: req.body.email })

    // Checking if User already Exists in the Database
    if (user) {
        res.status(400).json('User already Exists..!')
    }
    else {
        // Creating User 
        const newUser = new User(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: cryptoJs.AES.encrypt(req.body.password, process.env.CRYPTOJS_KEY).toString()
            }
        )

        
        try {
            // Saving User
            const registeredUser = await newUser.save()

            const {password, ...otherDetails} = registeredUser._doc

            res.status(201).json(otherDetails)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}

// Login Controller
exports.loginUser = async (req, res)=>{

    try {
        // Finding User in Database
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            res.status(404).json('User not Found..!')
        }

        const hashedPassword = cryptoJs.AES.decrypt(user.password, process.env.CRYPTOJS_KEY)

        const originalPassword = hashedPassword.toString(cryptoJs.enc.Utf8);

        // Comparing User entered password to the Original User password
        if (originalPassword !== req.body.password) {
            res.status(401).json('Wrong Credentials..!')
        }
        else {
            // Creating Access Token for User 
            const accessToken = jwt.sign({
                id: user.id,
                isAdmin: user.isAdmin
            },
                process.env.JWT_KEY,
                {
                    expiresIn: "1d"
                }
            )

            const { password, ...otherDetails } = user._doc

            res.status(200).json({ ...otherDetails, accessToken })

        }
    }
    catch (err) {
        res.status(500).json(err)
    }

}
