const express = require('express');
const app = express();
const userRouter = express.Router();
const { userType , signInBody, updateUserBody } = require('../types');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const {authMiddleware} = require("../middleware/middleware");
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

userRouter.use(authMiddleware);
userRouter.put("/",async(req,res)=>{
    const putBody = req.body;
    const userId = req.userId;
    const updateUserBodyValid = updateUserBody.safeParse(putBody);
    if(!updateUserBodyValid.success) {
        res.json({
            msg:"Invalid input"
        });
        return;
    }
    try {
        await User.updateOne({
            _id:userId, 
        }, {
            firstName: putBody.firstname,
            lastName: putBody.lastname,
            password: putBody.password
        });
        res.json({
            msg:"User Updated"
        })
    } catch(e) {
        res.json({
            e
        })
    }
    console.log(req.userId);
});

userRouter.get("/bulk",async (req,res)=>{
    const filter = req.query.filter;
    // console.log(req.query);
    console.log(filter);
    if(!filter) {
        res.json({
            msg:"no filter provided"
        });
        return;
    }
    try {
        const users = await User.find({
            "$or":[
                {
                    firstName: {
                        '$regex': filter
                    }
                }, {
                    lastName: {
                        '$regex': filter
                    }
                }
            ]
        });
        console.log(users);
        res.json({
            users
        })
    } catch(e) {
        res.json({
            e
        })
    }
})

module.exports = userRouter;
