const express = require('express');
const home_controller = require('../controllers/home-controller');
const router = express.Router();

router.get('/', home_controller.onLoad);

router.get('/categories', home_controller.loadCategories);

router.post('/categories/delete/:id', home_controller.deleteCategory);

router.get('/items', (req, res) => {
  res.send('items page not implemented yet');
});
module.exports = router;
