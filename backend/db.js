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


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,//in amount last 2 digit are decimal places just storing in integer as per harkirat as per standard
        require: true
    }
})

  
const User = new mongoose.model("User", userSchema);

const Account = new mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account
}