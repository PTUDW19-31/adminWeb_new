var express = require('express');
var router = express.Router();

const ProductController = require('./productController');

/* GET home page. */
router.get('/', ProductController.list);


router.get('/:productID', function(req, res, next) {
    res.render('productDetail', { title: 'Product Detail' });
  });


  
module.exports = router;