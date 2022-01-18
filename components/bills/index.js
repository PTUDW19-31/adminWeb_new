const express = require('express');
const router = express.Router();
const billController = require('./billController');

router.get('/', billController.list);

router.get('/view/:id',billController.view);

module.exports = router;