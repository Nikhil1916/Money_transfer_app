const express = require('express');
const userRouter = express.Router();
const { userType , signInBody } = require('../types');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../Config');
userRouter.post("/signup",async(req,res)=>{
   const user = req.body;
   const isUserPayloadValid = userType.safeParse(user);
   console.log(isUserPayloadValid.error);
   if(!isUserPayloadValid.success) {
    res.status(411).json({
        'msg': 'invalid input'
    });
    return;
   }

   try{
    const {username, firstname,lastname,password} = user;
    const userCheck = await User.findOne({
        userName: username
    });
    console.log(userCheck);
    if(userCheck) {
        res.status(411).json({
            'msg': 'User already there'
        });
    } else {
        const userR = await User.create({
            userName: username,
            firstName: firstname,
            lastName: lastname,
            password: password
        });
        var token = jwt.sign({ userId:userR._id }, JWT_SECRET);
        console.log(token);
        res.json(
            {
                userId: "userId of newly added user is "+ userR._id,
                token
            }
        )
    }
   } catch(e) {
    console.log(e);
    res.json({
        e
    })
   }
});


userRouter.post("/signin",async(req,res)=>{
    const user = req.body;
    const isPayloadValid = signInBody.safeParse(user);
    if(!isPayloadValid.success) {
        res.status(411).json({
            'msg': 'invalid input'
        });
        return;
    } else {
        const {username,password} = user;
        const userCheck = await User.findOne({
            userName: username,
            password
        });
        if(!userCheck) {
            res.status(411).json({
                message: "Error while logging in"
            });
            return;
        }
        const token = jwt.sign({ userId:userCheck._id }, JWT_SECRET);
        res.json({
            token
        })
    }

});
module.exports = userRouter;
