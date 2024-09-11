const mongoose = require("mongoose")
const User = require("./userModel")
const carSchema = mongoose.Schema({
    user : {
        require : true,
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    car : {
        require : true,
        type : String,
        enum : ['safari','punch','nexon','altroz','alto','harrior']
        
    },
    registation : {
        require : true,
        type : String
        
    },
    status : {
        type : String,
        require : true,
        enum : ["open", 'close', 'pending'],
        default : "open"
    },
    description : {
        require : true,
        type : String,

    }
},{
    timestamp : true
})

module.exports = mongoose.model("Car",carSchema)