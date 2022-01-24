const sub_categories = require('../../models/sub_categories');

exports.get_sub_categories = async () => {
  try {
    const all_sub_categories = await sub_categories.find({}).sort({ createdAt: '-1' });
    if (!all_sub_categories) return [404, "Not Found!", "There isn't any Sub-Category Present!"];
    return [200, all_sub_categories, "Successfully Fetched all Sub-Categories"];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};

exports.get_sub_categories_once = async (sub_category_type) => {
  if (sub_category_type === "" ||
    sub_category_type === null)
    return [400, "Bad Request!", "Specify Sub-Category Correctly!"];
  try {
    const category = await sub_categories.findOne({
      sub_category_type
    }).sort({ createdAt: '-1' });
    if (!category) return [404, "Not Found!", "There isn't any Sub-Category Present!"];
    return [200, category, "Successfully found a Sub-Category"];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};

exports.add_sub_category = async (sub_category_type_to_add) => {
  let new_sub_category = { sub_category_type: sub_category_type_to_add };
  if (sub_category_type_to_add === "" ||
    sub_category_type_to_add === null)
    return [400, "Bad Request!", "Specify Sub-Category Correctly"];
  try {
    const check_sub_category = await this.get_sub_categories_once(sub_category_type_to_add);
    if (check_sub_category[0] === 200) return [404, "Already present!", "Sub-Category Already Present!"];
    new_sub_category = new sub_categories(new_sub_category);
    new_sub_category = await new_sub_category.save();
    return [201, new_sub_category, "Sucessfully Added Sub-Category"];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};

exports.update_sub_category = async (prev_sub_category_type, new_sub_category_type_to_update) => {
  if (prev_sub_category_type === new_sub_category_type_to_update ||
    prev_sub_category_type === "" ||
    prev_sub_category_type === null ||
    new_sub_category_type_to_update === "" ||
    new_sub_category_type_to_update === null)
    return [400, "Bad Request!", "Specify Sub-Category Correctly"];
  try {
    const update_sub_category = await sub_categories.findOneAndUpdate(
      {
        sub_category_type: prev_sub_category_type
      },
      {
        $set: {
          sub_category_type: new_sub_category_type_to_update
        }
      },
      {
        new: true,
      });
    if (!update_sub_category) return [404, "Not Updated!", "Sub-Category Can't be Updated!"];
    return [202, update_sub_category, "Successfully Updated Sub-Category"];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};

exports.delete_sub_category = async (sub_category_type_to_delete) => {
  if (sub_category_type_to_delete === "" ||
    sub_category_type_to_delete === null)
    return [400, "Bad Request!", "Specify Sub-Category Correctly"];
  try {
    const delete_sub_category = await sub_categories.findOneAndRemove(
      {
        sub_category_type: sub_category_type_to_delete,
      }
    );
    if (!delete_sub_category) return [404, "Not Found!", "No Deletion Happened!"];
    return [202, delete_sub_category, "Sub-Category Successfully Deleted!"];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};