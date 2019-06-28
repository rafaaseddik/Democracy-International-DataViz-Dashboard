const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const Lists = require('../models/lists');
const Submission = require('../models/submission');

/* router.post('/register', (req, res) => {


  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  console.log('------------', newUser);
  newUser.save((err) => {

    if (err) {
      console.log(err);
    }

    else {
      res.json({ success: true, msg: 'User successfully registered.' });
    }
  });
}); */


/* router.post('/login', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username }, (err, user) => {

    if (err) throw err;

    if (!user) {
      return res.status(400).json({ success: false, msg: 'User not found.' });
    }

    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) throw err;

      if (isMatch) {

        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        return res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          }
        });
      }
      else {
        return res.status(400).json({ success: false, msg: 'Wrong password.' });
      }
    });
  });

}); */

router.post('/add_submission', (req, res) => {
  console.log(req.body.blank,req.body.blank,
    req.body.spoiled,
         req.body.canceled,
   typeof (req.body.total),
    typeof(req.body.username),
   typeof (req.body.data));
  var submission = new Submission({
    city: req.body.city,
    blank: req.body.blank,
    spoiled: req.body.spoiled,
    canceled: req.body.canceled,
    total: req.body.total,
    username: req.body.username,
    data: req.body.data,
    
  });
  console.log('-dsklqkdkkkkkkkkkk');
  console.log('-------Add Submission-----', submission);
  submission.save((err) => {

    if (err) {
      console.log(err,'dd');
    }

    else {
      res.json({ success: true, msg: 'hotel successfully Added to db.' });
    }
  });
});
//
router.get('/get_lists', (req, res) => {
  console.log(req.query.nom_fr);
  Lists.find({nom_fr:req.query.nom_fr}, function (err, docs) {
    if (docs) {
      res.json(docs);
    } else {
      console.log('err', err);
    }

  })

})
/* router.get('/search_hotel', (req, res) => {
  console.log(req.query.category,req.query.city);
  Hotel.find({city:req.query.city,category:req.query.category}, function (err, docs) {
    if (docs) {
      res.json(docs);
    } else {
      console.log('err', err);
    }

  })

}) */
//update the fieeld of sent bs to true
/* router.get('/updateSentBsState', (req, res) => {
  console.log(req.query.id_rdv);
  Rdv.update({ 'id_rdv': req.query.id_rdv }, {sent: true}, function (err, docs) {
    if (docs) {
      res.json({ success: true,  });

    } else {
      console.log('err', err);
    }

  })

})

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
}) */

module.exports = router;