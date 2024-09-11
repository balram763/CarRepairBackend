const expressAsyncHandler = require("express-async-handler")
const User = require("../model/userModel")
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');


const registerUser = expressAsyncHandler(async(req,res) => {
    const {name , email , password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error("please Fill All Details")
    }
    const userExist = await User.findOne({email : email})
    if(userExist){
        res.status(400)
        throw new Error("user already exist")
    }

    // pswd encryption

    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
        name,
        email,
        password : hashPassword,
    })

    if(!user){
        res.status(400)
        throw new Error("user is not created")
    }

    res.status(201)
    res.json({
        id : user._id,
        name : user.name,
        email : user.email,
        token : generateToken(user._id)
    })
    res.send("register successfully")
})


const loginUser = expressAsyncHandler(
    async(req,res) => {
        
    const {email , password} = req.body

    if(!email || !password){
        res.status(400)
        throw new Error("Fill All Details")
    }

    const user = await User.findOne({email})

        if(user && bcrypt.compareSync(password, user.password)){
        res.status(200).json({
            id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("invalid Credentials")
    }
    
    


    }
)

//Genetate token 

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//private

const privateController = expressAsyncHandler(
    async(req,res) => {
        res.json({
            msg : "private route"
        })
    }
)


module.exports = {registerUser,loginUser,privateController}