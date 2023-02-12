const itemModel = require('../models/items-model');
const categoryModel = require('../models/categories-model');

exports.onLoad = async (req, res) => {
  let num_of_categories;
  let num_of_items;
  try {
    num_of_categories = await categoryModel.estimatedDocumentCount({});
    num_of_items = await itemModel.estimatedDocumentCount({});
  } catch (err) {
    console.log(err);
  }
  res.render('home', {
    no_of_categories: num_of_categories,
    no_of_items: num_of_items,
  });
};

exports.loadCategories = async (req, res) => {
  let results;
  try {
    results = await categoryModel.find({});
  } catch (e) {
    console.error(e.message);
  } finally {
    res.render('categories', { categories: results });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const result = await categoryModel.deleteOne({ _id: req.params });
    console.log('item was deleted successfully...');
    res.redirect('/');
  } catch (e) {
    console.error(e.message);
    res.end();
  }
};
