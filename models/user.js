const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  id: String,
  task: String,
  priority: Number,
  done: Boolean
});

const userSchema = mongoose.Schema({
  token: String,
  name: String,
  email: String,
  password: String,
  toDos: [todoSchema],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
