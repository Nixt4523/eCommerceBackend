// Importing package
const mongoose = require('mongoose')

// Creating User Schema
const userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true,
        },
        lastName : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            reuqired : true,
        },
        isAdmin : {
            type : Boolean,
            default : false
        }
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model("User", userSchema)