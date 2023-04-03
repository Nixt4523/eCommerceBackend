// Importing package
const mongoose = require('mongoose')

// Creating Product Schema
const productSchema = mongoose.Schema(
    {
        title : {
            type : String,
            required : true,
        },
        description : {
            type : String,
            required : true,
        },
        imageUrl : {
            type : String,
            required : true,
        },
        categories : {
            type : Array,
        },
        size : {
            type : Array,
        },
        price : {
            type : Number,
            required : true,
        },
        inStock : {
            type : Boolean,
            default : true
        }
    },
    {
        timestamps : true,
    }
)

module.exports = mongoose.model("Products", productSchema)