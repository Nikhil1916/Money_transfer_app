const express = require('express');
const app = express();
const userRouter = express.Router();
const { userType , signInBody, updateUserBody } = require('../types');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const {authMiddleware} = require("../middleware/middleware");
const { JWT_SECRET } = require('../Config');

userRouter.post("/signup",async(req,res)=>{
   const user = req.body;
   const isUserPayloadValid = userType.safeParse(user);
   if(!isUserPayloadValid.success) {
    res.status(411).json({
        'msg': 'invalid input',
        'error_path_key': isUserPayloadValid?.error?.issues[0]?.path[0],
        'err_message': isUserPayloadValid?.error?.issues[0]?.message
    });
    return;
   }

   try{
    const {username, firstname,lastname,password} = user;
    const userCheck = await User.findOne({
        userName: username
    });
    (userCheck);
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
        console.log(userR);
        await Account.create({
            userId: userR._id,
            amount:1+Math.ceil(Math.random()*1000)
        })

        var token = jwt.sign({ userId:userR._id }, JWT_SECRET);
        res.json(
            {
                userId: "userId of newly added user is "+ userR._id,
                token,
                user: {
                    userName: username,
                    firstName: firstname,
                    lastName: lastname,
                }
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
            token,
            user: {
                username: userCheck.userName,
                firstname: userCheck.firstName,
                lastname: userCheck.lastName,
            }
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
});

userRouter.get("/bulk",async (req,res)=>{
    const filter = req.query.filter || "";
    try {
        let users = await User.find({
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
        users = users?.map((user)=>{
            return {
                "_id": user?._id,
                "userName": user?.userName,
                "firstName": user?.firstName,
                "lastName": user?.lastName,
            }
        })
        res.json({
            users
        })
    } catch(e) {
        res.json({
            e
        })
    }
});

userRouter.get("/",async(req,res)=>{
    console.log(req.query.id);
    const userId = req.query.id || req.userId;
    const data = await User.findOne({
        _id: userId
    });
    const account = await Account.findOne({
         userId
    });
    
    return res.json({
        username: data.userName,
        firstname: data.firstName,
        lastname: data.lastName,
        account
    })
})

module.exports = userRouter;
