const express = require("express")
const { getComplaints, getComplaint, raiseComplaint, updateComplaint } = require("../Controller/carController")
const protect = require("../middleware/authMiddleware")

const router = express.Router()


router.get("/",protect,getComplaints)
router.get("/:id",protect,getComplaint)
router.post("/",protect,raiseComplaint)
router.put("/:id",protect,updateComplaint)

router.use("/:id/note", require("./noteRoutes"))
module.exports = router;