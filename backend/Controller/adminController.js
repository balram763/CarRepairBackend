const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Car = require("../model/carModel");
const Note = require("../model/noteModel");


const getUsers = expressAsyncHandler(async(req,res)=>{
   const users = await User.find()
   if(!users){
    res.status(400)
    throw new Error("NO USER FOUND")
   }
   res.status(200)
   res.json(users)
})
const getCars = expressAsyncHandler(async(req,res)=>{
    const cars = await Car.find()
    if(!cars){
        res.status(400)
        throw new Error("NO CAR FOUND")
       }
       res.status(200)
       res.json(cars)
})
const getNotes = expressAsyncHandler(async(req,res)=>{
    const notes = await Note.find()
    if(!notes){
        res.status(400)
        throw new Error("NO CAR FOUND")
       }
       res.status(200)
       res.json(notes)
})
const updateCar = expressAsyncHandler(async(req,res)=>{
    const updateCar = await Car.findByIdAndUpdate(req.params.id,req.body,{new : true})
    if(!updateCar){
        res.status(400)
        throw new Error("query not Updated")
    }
    res.status(200).json(updateCar)
})

const singleUser = expressAsyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error("This user is not in our database")
    }

    // res.status(200).json(user._id)
    const car = await Car.find({user : "66deb64b1fabd7c275314485"})
    const note = await Note.find({user : "66deb64b1fabd7c275314485"})
    res.status(200).json({car,note})

    // res.status(200).json(note)
})

module.exports = {getUsers,getCars,getNotes,updateCar,singleUser}