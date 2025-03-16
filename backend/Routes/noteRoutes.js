const express = require("express");

const protect = require("../middleware/authMiddleware");
const { getNotes, addNote } = require("../Controller/noteController");
const upload = require("../uploads/multerConfig");



const router = express.Router({ mergeParams: true });

router.get("/", protect, getNotes);
router.post("/", protect,upload.single('img'), addNote);

module.exports = router;
