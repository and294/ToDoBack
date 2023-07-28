const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
 name: String,
 priority: Number,
 done: Boolean,
// dateDue: Date,
});

const Todo = mongoose.model('todos', todoSchema);

module.exports = Todo;