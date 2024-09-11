const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel")
const jwt = require("jsonwebtoken")

const admin = expressAsyncHandler(async(req,res,next)=>{
    let token = ""
    

       try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decode.id).select("-password")
            
            if(!user){
                res.status(400)
                throw new Error("no user found")
            }
            // console.log(user.isAdmin)
            
            if(user.isAdmin){
                req.user = user
                next()
            }
            
    
            
    
        }else{
            res.status(400)
            throw new Error("No token Found")
        }
        
       } catch (error) {
        res.status(400)
            throw new Error("unauthorised Access")
       }

})

module.exports = admin