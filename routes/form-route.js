const express = require('express');
const form_controller = require('../controllers/form-controller');
const itemModel = require('../models/items-model');
const router = express.Router();

router.get('/item', form_controller.onItemFormLoad);

router.get('/category', form_controller.number_of_categories);

router.post('/item', form_controller.addItem);
router.post('/category', form_controller.addCategory);
module.exports = router;
