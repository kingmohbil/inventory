const itemModel = require('../models/items-model'); // requiring the item model for the CRUD operations
const categoryModel = require('../models/categories-model'); // require the category model for the CRUD operations
// rendering the home page function
exports.renderHome = async (req, res) => {
  let num_of_categories = 0;
  let num_of_items = 0;
  try {
    num_of_categories = await categoryModel.estimatedDocumentCount({}); // awaiting for the number of categories in the database
    num_of_items = await itemModel.estimatedDocumentCount({}); // awaiting for the number of items in the database
  } catch (err) {
    console.log(err); //catching any errors
  } finally {
    //rendering the home page and emmbedding the values
    res.render('home', {
      no_of_categories: num_of_categories,
      no_of_items: num_of_items,
    });
  }
};

exports.renderCategories = async (req, res) => {
  let results = [];
  try {
    results = await categoryModel.find({}); // awaiting for all of the categories
  } catch (e) {
    console.error(e.message); // logging the error if any
  } finally {
    //rendering the categories page with the results
    res.render('categories', { categories: results });
  }
};
// rendering the items page with all of the items
exports.renderAllItems = async (req, res) => {
  try {
    const result = await itemModel.find({}).populate('category'); // awaiting for all of the items and populating the category
    // to get the name of the category
    console.log(result); // logging the results
    //rendering the items page with the results
    res.render('items', { title: 'All Items', items: result });
  } catch (e) {
    //handling the errord and rendering the pafe with an empty array
    console.error(e.message);
    res.render('items', { title: 'All Items', items: [] });
  }
};
// rendering a specific item from a category
exports.renderItemsFromCategory = async (req, res) => {
  try {
    const results = await itemModel
      .find({ category: req.params.id })
      .populate('category')
      .orFail(); //awaiting for the results and populating the category field and throwing an error if not found
    console.log(results);
    // reendering the items page, embedding the results and the title
    res.render('items', { title: results[0].category.name, items: results });
  } catch (e) {
    //handeling the errors and redirecting to the home page
    console.error(e.message);
    res.redirect('/');
  }
};
// deleting a category by it's id
exports.deleteCategory = async (req, res) => {
  try {
    //awaiting for the delete and if there is an error it will be handeled
    const result = await categoryModel.deleteOne({ _id: req.params.id });
    // deleting all the items in that category
    const deletedItems = await itemModel.delete({ category: req.params.id });
    // checking for the deletion success
    if (!result.acknowledged)
      throw new Error(`Cannot delete category with id ${req.params.id}`);
    console.log(
      `category with id: ${req.params.id} was deleted successfully...`
    );
  } catch (e) {
    //handling the error and logging the message
    console.error(e.message);
  } finally {
    //handling the error and logging the message
    res.redirect('/');
  }
};
// deleting a item by it's id
exports.deleteItem = async (req, res) => {
  try {
    //awaiting for the delete and if there is an error it will be handeled
    const result = await itemModel.deleteOne({ _id: req.params.id });
    // checking for the deletion success
    if (!result.acknowledged)
      throw new Error(`Cannot delete item with id ${req.params.id}`);
    console.log(`item with id ${req.params.id} was deleted successfully`);
  } catch (e) {
    //handling the error and logging the message
    console.error(e.message);
  } finally {
    //handling the error and logging the message
    res.redirect('/');
  }
};
