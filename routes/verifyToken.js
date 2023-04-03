const jwt = require('jsonwebtoken')

// Verifying User Auth Token 
const verifyToken = (req, res, next) => {

    const authHeader = req.headers.token

    if (authHeader) {

        const token = authHeader.split(" ")[1]

        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {

                return res.status(403).json('Your Token is Invalid or Expired..!')

            }
            req.user = user
            next()
        })

    }
    else {

        return res.status(401).json('You are not Authenticated User..!')

    }

}

// Verifying User Auth Token and Checking Authorization
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.userId || req.user.isAdmin) {
            next()
        }
        else {
            res.status(403).json('Your are not Authorized User..!')
        }
    })
}

// Verifying Admin Auth Token
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        }
        else {
            res.status(403).json('Your are not Authorized User..!')
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}