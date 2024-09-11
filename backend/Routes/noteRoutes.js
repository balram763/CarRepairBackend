const express = require("express");

const protect = require("../middleware/authMiddleware");
const { getNotes, addNote } = require("../Controller/noteController");


const router = express.Router({ mergeParams: true });

router.get("/", protect, getNotes);
router.post("/", protect, addNote);

module.exports = router;
