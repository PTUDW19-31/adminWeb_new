const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user){
    res.render('index', { title: 'Asbab - Dashboard' });
  } else{
    res.redirect('/');
  }
});

module.exports = router;
