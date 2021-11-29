var express = require('express');
var router = express.Router();

const ProductController = require('./productController');

/* GET home page. */


// add product
router.post('/store', ProductController.store);

// update product
router.get('/update/:id', ProductController.update);
router.put('/saveUpdate/:id', ProductController.saveUpdate);

//delete product
router.post('/hiden/:id', ProductController.hiden);
router.post('/active/:id', ProductController.active);

//list product
router.get('/', ProductController.list);
  
module.exports = router;