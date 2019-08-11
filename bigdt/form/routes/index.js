var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Student Data' });
});

router.get('/users', function(req, res) {
  var db = req.db;
  var users = db.get('users');
  users.find({},{}, function(e, docs){
    res.render('users', {
      title: 'Student Details',
      'users': docs
    });
  });
});

router.get('/newuser', function(req, res) {
  res.render('newuser', { 
    title: 'New Student'
  });
});

router.post('/createuser', function(req, res) {
  var db = req.db;
  var userName = req.body.username;
  var userRoll = req.body.rollno;
  var userBranch = req.body.branch;
  var userAge = req.body.age;
  var users = db.get('users');
  users.insert({
    'name' : userName,
    'rollno' : userRoll,
    'branch' : userBranch,
    'age' : userAge
  }, function (error, doc) {
    if (error) {
      res.send("Could not create new user.");
    } else {
      res.location('users');
      res.redirect('users');
    }
  });
});

router.get('/deluser', function(req, res) {
  res.render('deluser', { 
    title: 'Delete Student Details'
  });
});

router.post('/duser', function(req, res) {
  var db = req.db;
  var userRN = req.body.rollno;
  var users = db.get('users');
  users.remove({
    'rollno' : userRN
  }, function (error, doc) {
    if (error) {
      res.send("Could not delete user.");
    } else {
      res.location('users');
      res.redirect('users');
    }
  });
});

module.exports = router;
