//Importing packages
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

// Importing Routes
const authRoutes = require('./routes/authRoutes')
const userRoute = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const cartRoutes = require('./routes/cartRoutes')
const statsRoutes = require('./routes/statsRoutes')

//Configurations
dotenv.config()
const PORT = process.env.PORT

//Initializing App
const app = express()

//Middlewares
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoute)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/stats', statsRoutes)

//Connecting to Database and Starting Server 
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(PORT || 2000, () =>
            console.log("Server Started..!", PORT)
        )
        console.log('Connected to Database..!')
    })
    .catch((err) => {
        console.log(err)
    })