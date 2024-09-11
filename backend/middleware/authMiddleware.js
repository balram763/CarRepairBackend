const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const User = require("../model/userModel")

const protect = expressAsyncHandler( async(req,res,next) => {
    let token = ""
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decode.id).select("-password")
        // console.log(user)
        req.user = user

        if(!user){
            req.statusCode(400)
            throw new Error("invalid user")
        }
        next()
        }
        else{
            res.status(400)
            throw new Error("No token Found , Unauthorised access")
        }
    })
module.exports = protect