const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel")
const Car = require("../model/carModel")


const getComplaints = expressAsyncHandler(
    async(req,res) => {
        console.log(req.user)
        const user = await User.findById(req.user._id.toString())

        if(!user){
            res.status(404)
            throw new Error("User Not Found")
        }

        const complaints = await Car.find({user : user._id})

        if(!complaints){
            res.status(404)
            throw new Error("no Complaints Found")
        }

        res.status(200)
        res.json(complaints)
    }
)
const getComplaint = expressAsyncHandler(async (req, res) => {
    // Check User Using JWT
  
    const user = await User.findById(req.user._id.toString());
  
    if (!user) {
      res.status(404);
      throw new Error("User Not Exist");
    }
  
    //   Find Complaints
  
    const complaint = await Car.findById(req.params.id);
  
    if (complaint) {
      res.status(200).json(complaint);
    }
  
    res.status(404);
    throw new Error("Complaint Not Found");
  });
  

const updateComplaint = expressAsyncHandler(
    async(req,res) => {
        const user = await User.findById(req.user._id.toString());

        if (!user) {
          res.status(404);
          throw new Error("User Not Exist");
        }
      
        const updatedComplaint = await Car.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
      
        if (!updatedComplaint) {
          res.status(400);
          throw new Error("Complaint Not Raised");
        }
      
        res.status(201).json(updatedComplaint);
      
    }
)
const raiseComplaint = expressAsyncHandler(
    async(req,res) => {
        const { car, registration, description } = req.body;

  if (!car || !description || !registration) {
    res.status(401);
    throw new Error("Please Fill All Details");
  }

  // Check User Using JWT

  const user = await User.findById(req.user._id.toString());

  if (!user) {
    res.status(404);
    throw new Error("User Not Exist");
  }

  const complaint = await Car.create({
    user: req.user._id,
    car: car.toLowerCase(),
    registration,
    description: description,
    status: "open",
  });

  if (!complaint) {
    res.status(400);
    throw new Error("Complaint Not Raised");
  }

  res.status(201).json(complaint);
})


module.exports = {getComplaint,getComplaints,updateComplaint,raiseComplaint}