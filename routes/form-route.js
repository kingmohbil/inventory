const express = require('express');
const form_controller = require('../controllers/form-controller');
const itemModel = require('../models/items-model');
const router = express.Router();

router.get('/item', (req, res) => {
  res.render('item-form');
});

router.get('/category', (req, res) => {
  res.send('Add categories page should be loaded');
});

router.post('/item', form_controller.addItem);
module.exports = router;
