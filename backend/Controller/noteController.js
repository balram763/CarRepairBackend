const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Note = require("../model/noteModel");


const getNotes = expressAsyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id.toString());

  if (!user) {
    res.status(404);
    throw new Error("User Not Exist");
  }

  // const notes = await Note.find({ user: user._id });
  const notes = await Note.find({ car: req.params.id });

  if (!notes) {
    res.status(404);
    throw new Error("Notes Not Found");
  }

  res.status(200).json(notes);
});

const addNote = expressAsyncHandler(async (req, res) => {

  const { id,text } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!text) {
    res.status(400);
    throw new Error("Fill All Details!");
  }


  const user = await User.findById(req.user._id.toString());

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  const note = await Note.create({
    user: user._id,
    car: id,
    note: text,
    isStaff : user.email === 'admin@gmail.com' ? true : false,
    image : imageUrl
  });

  if (!note) {
    res.status(400);
    throw new Error("Note is not  Added");
  }

  res.status(201).json(note);
});

module.exports = { getNotes, addNote };
