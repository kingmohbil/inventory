const express = require('express'); // requiring express for our router
const form_controller = require('../controllers/form-controller'); // require the form controller functions
const router = express.Router(); // creating our router
// renders the add item form
router.get('/item', form_controller.onItemFormLoad);
// renders the add categories form and emmits the number of categories
router.get('/category', form_controller.renderCategoryForm);
// handling the add item post request
router.post('/item', form_controller.addItem);
// handling the add categories post request
router.post('/category', form_controller.addCategory);
// exporting our router
module.exports = router;
