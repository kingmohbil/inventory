const mongoose = require('mongoose');
const itemModel = require('../models/items-model');
const categoryModel = require('../models/categories-model');

exports.addItem = async (req, res) => {
  try {
    const categoryId = await categoryModel.findOne(
      { name: req.body.category },
      '_id'
    );
    const exist = await itemModel.exists({ name: req.body.name });
    if (exist) throw new Error('cannot insert duplicate items...');

    const item = new itemModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: categoryId._id,
      number_in_stock: req.body.quantity,
      url: `/categories/${req.body.category}/`,
    });

    item.url += item._id;
    await item.save();
    console.log('item saved successfully....');
  } catch (error) {
    console.error(error.message);
  } finally {
    res.redirect('/');
  }
};

exports.addCategory = async (req, res) => {
  try {
    const number_of_categories = await categoryModel.estimatedDocumentCount({});
    const exist = await categoryModel.exists({ name: req.body.name });
    if (number_of_categories > 21)
      throw new Error('Max number of categories is 20...');
    if (exist) throw new Error('The category already exists...');
    const category = new categoryModel({
      name: req.body.name,
      description: req.body.description,
      url: `/${req.body.name}/`,
    });
    category.url += category._id;
    await category.save();
    console.log('category saved successfully...');
  } catch (err) {
    console.error(err.message);
  } finally {
    res.redirect('/');
  }
};

exports.onItemFormLoad = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 0)
      throw new Error('the database is disconnected....');
    const result = await categoryModel.find({}, 'name').orFail();
    const itemsNum = await itemModel.estimatedDocumentCount({});
    res.render('item-form', {
      categories: result,
      no_of_items: itemsNum,
    });
  } catch (e) {
    console.log(e.message);
    res.render('item-form');
  }
};

exports.number_of_categories = async (req, res) => {
  let result;
  try {
    result = await categoryModel.estimatedDocumentCount({});
  } catch (e) {
    console.error(e.message);
  } finally {
    res.render('category-form', { no_of_categories: result });
  }
};
