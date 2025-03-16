// const expressAsyncHandler = require("express-async-handler")
// const User = require("../model/userModel")
// let bcrypt = require('bcryptjs');
// let jwt = require('jsonwebtoken');


// const registerUser = expressAsyncHandler(async(req,res) => {
//     const {name , email , password, isAdmin} = req.body

//     if(!name || !email || !password){
//         res.status(400)
//         throw new Error("please Fill All Details")
//     }
//     const userExist = await User.findOne({email : email})
//     if(userExist){
//         res.status(400)
//         throw new Error("user already exist")
//     }

//     // pswd encryption

//     let salt = bcrypt.genSaltSync(10);
//     let hashPassword = bcrypt.hashSync(password, salt);

//     const user = await User.create({
//         name,
//         email,
//         password : hashPassword,
//     })

//     if(!user){
//         res.status(400)
//         throw new Error("user is not created")
//     }

//     res.status(201)
//     res.json({
//         id : user._id,
//         name : user.name,
//         email : user.email,
//         token : generateToken(user._id),
//         isAdmin : user.isAdmin
//     })
//     res.send("register successfully")
// })



// const loginUser = expressAsyncHandler(async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: "Fill all details" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//         return res.status(400).json({ message: "USER NOT FOUND SIGN UP FIRST" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
    
//     if (!isMatch) {
//         return res.status(400).json({ message: "Invalid credentials" });
//     }

//     res.status(200).json({
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//         isAdmin: user.isAdmin,
//     });
// });


// //Genetate token 

// const generateToken = (id) =>{
//     return jwt.sign({id},process.env.JWT_SECRET)
// }

// //private

// const privateController = expressAsyncHandler(
//     async(req,res) => {
//         res.json({
//             msg : "private route"
//         })
//     }
// )


// module.exports = {registerUser,loginUser,privateController}

const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all details" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Encrypt Password (Use async version)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false,
    });

    if (!user) {
        return res.status(400).json({ message: "User creation failed" });
    }

    res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        isAdmin: user.isAdmin,
    });
});

// Login User
const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Fill all details" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found. Sign up first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        isAdmin: user.isAdmin,
    });
});

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Private Route
const privateController = expressAsyncHandler(async (req, res) => {
    res.json({ message: "Private route accessed successfully" });
});

module.exports = { registerUser, loginUser, privateController };
