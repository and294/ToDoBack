var express = require("express");
var router = express.Router();

const Todo = require("../models/toDo");

router.post("/add/:token", async function (req, res) {
  const {token} = req.query;
  const { task, priority } = req.body;
  const user = await User.findOne({ token });
console.log(user)
  user.toDos.push({
    task: task,
    priority: priority,
    done: false,
  });

  await user.save();
  res.json({result: true});

});

module.exports = router;
