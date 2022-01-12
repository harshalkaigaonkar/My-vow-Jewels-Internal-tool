const categories = require('../../models/categories');

exports.get_categories = async () => {
  try {
    const all_categories = await categories.find({}).sort({ createdAt: '-1' });
    if (!all_categories) return [404, "Not Found!", "There isn't any Category Present!"];
    return [200, all_categories, "Successfully Fetched all Categories"];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};

exports.get_category = async (category_type) => {
  if (category_type === "" ||
    category_type === null)
    return [400, "Bad Request!", "Specify Category Correctly!"];
  try {
    const category = await categories.findOne({
      category_type
    });
    if (!category) return [404, "Not Found!", "There isn't any Category Present!"];
    return [200, category, "Successfully found a Category"];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};

exports.add_category = async (category_type_to_add) => {
  let new_category = { category_type: category_type_to_add };
  if (category_type_to_add === "" ||
    category_type_to_add === null)
    return [400, "Bad Request!", "Specify Category Correctly"];
  try {
    const check_category = await this.get_category(category_type_to_add);
    if (check_category[0] === 200) return [404, "Already present!", "Category Already Present!"];
    new_category = new categories(new_category);
    new_category = await new_category.save();
    return [201, new_category, "Sucessfully Added Category"];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};

exports.update_category = async (prev_category_type, new_category_type_to_update) => {
  if (prev_category_type === new_category_type_to_update ||
    prev_category_type === "" ||
    prev_category_type === null ||
    new_category_type_to_update === "" ||
    new_category_type_to_update === null)
    return [400, "Bad Request!", "Specify Category Correctly"];
  try {
    const update_category = await categories.findOneAndUpdate(
      {
        category_type: prev_category_type
      },
      {
        $set: {
          category_type: new_category_type_to_update
        }
      },
      {
        new: true,
      });
    if (!update_category) return [404, "Not Updated!", "Category Can't be Updated!"];
    return [202, update_category, "Successfully Updated Category"];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};

exports.delete_category = async (category_type_to_delete) => {
  if (category_type_to_delete === "" ||
    category_type_to_delete === null)
    return [400, "Bad Request!", "Specify Category Correctly"];
  try {
    const delete_category = await categories.findOneAndRemove(
      {
        category_type: category_type_to_delete,
      }
    );
    if (!delete_category) return [404, "Not Found!", "No Deletion Happened!"];
    return [202, delete_category, "Category Successfully Deleted!"];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};