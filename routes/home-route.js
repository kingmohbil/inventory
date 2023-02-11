const express = require('express');
const home_controller = require('../controllers/home-controller');
const router = express.Router();

router.get('/', home_controller.onLoad);

router.get('/categories', (req, res) => {
  res.send('categories page not implemented yet');
});

router.get('/items', (req, res) => {
  res.send('items page not implemented yet');
});
module.exports = router;
