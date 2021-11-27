var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Asbab - Dashboard' });
});

router.get('/login.html', function(req, res, next) {
  res.render('login', { title: 'Asbab - Login' });
});

// router.get('/itemList', function(req, res, next) {
//   res.render('itemList', { title: 'Asbab - Item List' });
// });

router.get('/itemEditor', function(req, res, next) {
  res.render('itemEditor', { title: 'Asbab - Item Editor' });
});

router.get('/charts.html', function(req, res, next) {
  res.render('charts', { title: 'Asbab - Charts' });
});

// router.get('/editProduct', function(req, res, next) {
//   res.render('editProduct', { title: 'Asbab - Product' });
// });

module.exports = router;
