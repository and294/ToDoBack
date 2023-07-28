const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  token: String,
  name: String,
  email: String,
  password: String,
  toDos: Array,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
