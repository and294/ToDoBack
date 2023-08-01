var express = require('express');
var router = express.Router();
const { checkBody } = require('../modules/checkBody');
const User = require('../models/user');
const uid2 = require("uid2");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*------------------------------------------------------------------------*/
/*                               Sign up                                  */
/*------------------------------------------------------------------------*/
router.post('/signUp', function(req, res) {
  const {name, email, password} = req.body;

  //Vérification si champs vide
  if(!checkBody([name, email, password])) {
    return res.json({
      result: false,
      errorSrc: "field",
      error: "Champs manquants ou vides."
    });
  }

  //Check si l'utilisateur existe, sinon le créé
  User.findOne({name}).then((data) => {
    if(data) {
      res.json({
        result: false,
        errorSrc: "username",
        error: "Utilisateur(trice) déjà inscrit(e)."
      });
    } else {
      const newUser = new User({
        token: uid2(32),
        name: name,
        email: email,
        password: password,
        toDO: []
      })

      newUser.save().then(() => {
        res.json({result: true, token: newUser.token});
      })
    }
  })
})
/*------------------------------------------------------------------------*/
/*                               Sign in                                  */
/*------------------------------------------------------------------------*/
router.post('/signIn', function(req, res) {
  const {name, password} = req.body;

    //Vérification si champs vide
    if(!checkBody([name, password])) {
      return res.json({
        result: false,
        errorSrc: "field",
        error: "Champs manquants ou vides."
      });
    }


User.findOne({name}).then((data) => {
  if(!data){
    res.json({
      result: false,
      errorSrc: "username",
      error: "Utilisateur(trice) non reconnu(e)."
    });
  } else {
    if(data.password === password){
      res.json({result: true, token: data.token});
    } else {
      res.json({
        result: false,
        errorSrc: "password",
        error: "Mot de passe erroné."
      });
    }
  }
})
});


/*------------------------------------------------------------------------*/
/*                              Get todos                                 */
/*------------------------------------------------------------------------*/
router.get("/get/:token", async function(req, res) {
  const {token} = req.params;
  await User.findOne({ token }).then((data) => {
    res.json({toDo: data.toDos})
  })
})

/*------------------------------------------------------------------------*/
/*                             Ajouter todo                               */
/*------------------------------------------------------------------------*/
router.post("/add/:token", async function (req, res) {
  const {token} = req.params;
  const { task, priority } = req.body;
  const user = await User.findOne({ token });

  if (!user) {
    // If user is not found, send an error response
    return res.status(404).json({ error: "User not found with the given token." });
  }

 user.toDos.push({
   id: uid2(32),
   task: task,
   priority: priority,
   done: false,
 });

  await user.save();
  res.json({result: true});

});

/*------------------------------------------------------------------------*/
/*                            Supprimer todo                              */
/*------------------------------------------------------------------------*/
router.post("/delete/:token", async function(req, res) {
const {token} = req.params;
const {id} = req.body;
const user = await User.findOne({token});

if(!user){
  // If user is not found, send an error response
  return res.status(404).json({ error: "User not found with the given token." });
}

user.toDos = user.toDos.filter(toDo => toDo.id !== id);

await user.save();
res.json({result: true});
})

module.exports = router;
