var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
	  title: 'Express',
	  author: 'Koren'
  });
});

router.get('/newroute', function(req, res) {
  var animals = [
    {name: "Porky", type: "pig"},
    {name: "Sugar", type: "dog"},
    {name: "Mr. Bigglesworth", type: "cat"}
  ];
  res.render('newroute', { title: 'New Route', animals: animals });
});

router.get('/users', function(req, res) {
  var db = req.db;
  var users = db.get('users');
  users.find({},{}, function(e, docs){
    res.render('users', {
      title: 'Users',
      'users': docs
    });
  });
});

router.get('/newuser', function(req, res) {
  res.render('newuser', {
    title: 'New User'
  });
});

router.post('/createuser', function(req, res) {
  var db = req.db;
  var userName = req.body.username;
  var userAnimal = req.body.animal;
  var users = db.get('users');
  users.insert({
    'username' : userName,
    'animal' : userAnimal
  }, function (error, doc) {
    if (error) {
      res.send("Could not create new user.");
    } else {
      res.location('users');
      res.redirect('users');
    }
  });
});

module.exports = router;
