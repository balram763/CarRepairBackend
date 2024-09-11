const express = require("express")
const admin = require("../middleware/adminMiddleware")
const {getUsers,getCars, getNotes, updateCar, singleUser} = require("../Controller/adminController")

const router = express.Router()


router.get("/users",admin,getUsers)
router.get("/cars",admin,getCars)
router.get("/note",admin,getNotes)
router.put("/cars/:id",admin,updateCar)
router.get("/user/:id",admin,singleUser)



module.exports = router;