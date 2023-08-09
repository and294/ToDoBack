const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    id: String,
    task: String,
    priority: Number,
    done: Boolean
});

const Todo = mongoose.model('todos', todoSchema);

module.exports = Todo;