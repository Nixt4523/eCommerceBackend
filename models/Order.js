// Importing package
const mongoose = require('mongoose')

// Creating Order Schema
const orderSchema = mongoose.Schema(
    {  
        userId : {
            type : String,
            required : true,
        },
        products : [
            {
                productId : {
                    type : String,
                    required : true
                },
                quantity : {
                    type : Number,
                    default : 1
                }
            }
        ],
        amount : {
            type : Number,
            required : true
        },
        userAddress : {
            type : Object,
            required : true
        },
        orderStatus : {
            type : String,
            default : 'processing'
        }
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model('Order', orderSchema)