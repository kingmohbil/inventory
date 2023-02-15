const mongoose = require('mongoose'); // requiring mongoose for CRUD operations
const { body, validationResult } = require('express-validator'); // requiring express validator
const itemModel = require('../models/items-model'); // requiring our itemModel to create items
const categoryModel = require('../models/categories-model'); // requiring our categoryModel to create categories
const itemsModel = require('../models/items-model');
// adding an item
exports.addItem = [
  body('name', '* Name can`t be empty')
    .trim()
    .isLength({ min: 1, max: 80 })
    .escape(),
  body('name').custom(async (value) => {
    const exist = await itemModel.exists({ name: value });
    if (exist) throw new Error('* Name already exists');
    return true;
  }),
  body('description', '* Description shold at least contain 10 characters.')
    .trim()
    .isLength({ min: 10, max: 500 })
    .escape(),
  body('price', '* Price must be at least $0.1.').isFloat({ min: 0.1 }),
  body('quantity', '* Qunatity must be an integer greater than 0.').isInt({
    min: 0,
  }),
  async (req, res) => {
    const errors = [];
    const isValid = validationResult(req);
    if (!isValid.isEmpty()) {
      let result, itemsNum;
      try {
        result = await categoryModel.find({}, 'name');
        itemsNum = await itemsModel.estimatedDocumentCount({});
      } catch (err) {
        errors.push({
          msg: err.message,
        });
      } finally {
        res.render('item-form', {
          categories: result,
          no_of_items: itemsNum,
          errors: isValid.array(),
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          quantity: req.body.quantity,
        });
      }
    } else {
      const category = await categoryModel.findOne(
        { name: req.body.category },
        '_id'
      );
      itemModel.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        number_in_stock: req.body.quantity,
        category: category._id,
        url: `/${req.body.category}/${req.body.name}`,
      });
      res.redirect('/');
    }
  },
];
// adding a category to the database
exports.addCategory = [
  body('name', '* Name cannot be empty').trim().isLength({ min: 1 }).escape(),
  body('description', '* Description must be at least 10 characters')
    .trim()
    .isLength({ min: 10 })
    .escape(),
  body('name').custom(async (value) => {
    const exist = await categoryModel.exists({ name: value });
    if (exist)
      throw new Error('* The name already exists please choose another one');
    return true;
  }),
  body('name').custom(async (value) => {
    const categoriesNumber = await categoryModel.estimatedDocumentCount({});
    if (categoriesNumber > 21)
      throw new Error('* The maximum number of categories is 20');
    return true;
  }),
  async (req, res) => {
    const errors = [];
    const isValid = validationResult(req);
    if (!isValid.isEmpty()) {
      const categoriesNumber = await categoryModel.estimatedDocumentCount({});
      res.render('category-form', {
        no_of_categories: categoriesNumber,
        errors: isValid.array(),
        name: req.body.name,
        description: req.body.description,
      });
    } else {
      try {
        categoryModel.create({
          name: req.body.name,
          description: req.body.description,
          url: `/categories/${req.body.name}`,
        });
        res.redirect('/');
      } catch (e) {
        errors.push({
          msg: e.message,
        });
        const categoriesNumber = await categoryModel.estimatedDocumentCount({});
        res.render('category-form', {
          no_of_categories: categoriesNumber,
          errors: errors,
          name: req.body.name,
          description: req.body.description,
        });
      }
    }
  },
];

// rendering the item form
exports.onItemFormLoad = async (req, res) => {
  let result, itemsNum;
  let errors = [];
  try {
    result = await categoryModel.find({}, 'name');
    itemsNum = await itemModel.estimatedDocumentCount({});
    res.render('item-form', {
      categories: result,
      no_of_items: itemsNum,
      errors: [],
    });
  } catch (e) {
    errors.push({
      msg: e.message,
    });
    res.render('item-form', {
      categories: result,
      no_of_items: itemsNum,
      errors: errors,
    });
  }
};
//rendering the categories form
exports.renderCategoryForm = async (req, res) => {
  let errors = [];
  try {
    const result = await categoryModel.estimatedDocumentCount({});
    res.render('category-form', {
      no_of_categories: result,
      errors: [],
    });
  } catch (e) {
    errors.push({
      msg: e.message,
    });
    res.render('category-form', {
      no_of_categories: result,
      errors: errors,
    });
  }
};
