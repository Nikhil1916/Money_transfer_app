const mongoose = require('mongoose'); 
const { Schema } = require('zod');
mongoose.connect("mongodb+srv://nikhilchawla9013:WGe2NxcBcRruoZHN@paytm.6eusu7v.mongodb.net/paytm");

const userSchema = new mongoose.Schema({ 
    userName: { 
        type: String, 
        require: [true, 'email address is required!'],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 5,
        maxLength: 30
    }, 
    firstName: { 
        type: String, 
        require: true,
        min:5
    }, 
    lastName: String,
    password: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}) ;


const bankSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.Objectid,
        ref: "User"
    }
})

  
const User = new mongoose.model("User", userSchema);

const Bank = new mongoose.model("Bank", bankSchema);

module.exports = {
    User,
    Bank
}