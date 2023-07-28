var express = require("express");
var router = express.Router();

const Todo = require("../models/toDo");

/* GET home page. */
router.get("/getToDos", function (req, res, next) {
  Todo.find().then((data) => {
    console.log(data);
    res.json({ list: data });
  });
});

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

  /*User.findOne({ token }).then((data) => {
    if (data) {
      data.toDos.push();
    }
  });
  Todo.findOne({ name: req.body.name }).then((data) => {
    if (data === null) {
      const newToDo = new Todo({
        task: task,
        priority: priority,
        done: false,
        //dateDue: req.body.dateDue
      });
      newToDo.save().then((data) => {
        console.log(data);
      });
    }
  });*/
});

module.exports = router;
