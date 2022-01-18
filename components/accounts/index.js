const express = require('express');
const router = express.Router();
const accountController = require('./accountController');

router.get('/', accountController.list);

router.post('/add', accountController.add);

//delete product
router.post('/hiden/:id', accountController.hiden);
router.post('/active/:id', accountController.active);

module.exports = router;