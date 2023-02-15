const express = require('express'); // requiring express for our router
const home_controller = require('../controllers/home-controller'); // requiring the home controller functions
const router = express.Router(); // creating our router
// rendering the home page
router.get('/', home_controller.renderHome);
// renders the categories page
router.get('/categories', home_controller.renderCategories);
// handling the delete category request
router.post('/categories/delete/:id', home_controller.deleteCategory);
// rendering all the items in the database
router.get('/items', home_controller.renderAllItems);
// rendering the items from a certain category
router.get('/items/:id', home_controller.renderItemsFromCategory);
// handling the delete item request
router.post('/items/delete/:id', home_controller.deleteItem);
// exporting our router
module.exports = router;
