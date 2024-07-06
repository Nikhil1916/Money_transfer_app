const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware/middleware");
const accountRouter = express.Router();
const mongoose = require('mongoose'); 
accountRouter.use(authMiddleware);
accountRouter.get("/balance",async(req,res)=>{
    const userId = req.userId;
    const account = await Account.findOne({
        userId
    });
    if(account.amount) {
        res.status(200).json({
            balance: account.amount
        })
    } else {
        res.status(400).json({
            account
        })
    }
});


accountRouter.post("/transfer",async(req,res)=>{
    const session = await mongoose.startSession();
    
    session.startTransaction();
    const {amount , to} = req.body;
    const userId = req.userId;
    const accountFrom = await Account.findOne({
        userId
    });

    if(amount > accountFrom.amount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg:"Insufficient Balance",
        });
    }
    const accountTo = await Account.findOne({
        userId: to
    });

    if(!accountTo) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId: to
    }, {
        $inc:{
            amount: amount
        }
    });

    await Account.updateOne({
        userId
    }, {
        $inc:{
            amount: -amount
        }
    });

    await session.commitTransaction();
    res.json({
        message: "Transfer successful",
        // from: 
        from: userId,
        to
    })

})

module.exports = {
    accountRouter
}