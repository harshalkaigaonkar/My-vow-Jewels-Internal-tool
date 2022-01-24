const products = require('../../models/products');
const { get_category } = require('./categories');
const { get_sub_categories_once } = require('./sub_categories');

exports.get_products_all = async () => {
  try {
    const all_products = await products.find({}).populate('product_sub_category').populate('product_category').sort({ createdAt: "-1" }).limit(1000);
    if (!all_products) return [203, "Not Found!", "There Isn't Any Product Present!"];
    return [200, all_products, "Successfully Fetched Products."];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};

exports.get_products_based_on_category = async (category_type, sub_category_type) => {
  if (category_type === "" ||
    category_type === null ||
    sub_category_type === "" ||
    sub_category_type === null)
    return [400, "Bad Request!", "Specify Product Correctly"];
  try {
    const check_category = await get_category(category_type);
    const check_sub_category = await get_sub_categories_once(sub_category_type);
    if (!check_category) return [404, "Not Found!", "No Category Present with this type!"];
    if (!check_sub_category) return [404, "Not Found!", "No Sub-Category Present with this type!"];

    // needs to be tested
    const get_products = await products
      .find({ product_category: `${check_category[1]._id}`, product_sub_category: `${check_sub_category[1]._id}` })
      .populate('product_category')
      .populate('product_sub_category')
      .sort({ createdAt: "-1" })
      .limit(1000);
    if (!get_products) return [203, "Not Found!", "There Aren't Any Products Present!"];
    return [200, get_products, "Successfully Fetched Products."];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};

exports.get_product_one = async (product_code_no) => {
  if (product_code_no === "" ||
    product_code_no === undefined ||
    product_code_no === null)
    return [400, "Bad Request!", "Specify Product Code Correctly"];
  try {
    const product = await products.findOne({ product_code_no }).populate('product_category').populate('product_sub_category');
    console.log(product)
    if (!product) return [203, "Not Found!", "There Isn't Any Product Present!"];
    return [200, product, "Successfully Fetched Product."];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
}

exports.add_product = async (product_details) => {
  if (product_details === {} ||
    product_details === null ||
    product_details.product_code_no === undefined ||
    product_details.product_code_no === "" ||
    product_details.product_category === undefined ||
    product_details.product_category === "" ||
    product_details.product_sub_category === undefined ||
    product_details.product_sub_category === ""
  )
    return [400, "Bad Request!", "Specify Product Correctly"];
  const check_product = await this.get_product_one(product_details.product_code_no);
  if (check_product[0] !== 203) return [409, "Already Exists!", "Product Exists in the Database!"];

  // image to added in the S3 Bucket

  try {
    const new_product = new products(product_details);
    await new_product.save();
    return [201, new_product, "Successfully Created New Product."];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};

exports.update_product = async (product_code_no_to_change, updated_product_details) => {
  if (product_code_no_to_change === null ||
    product_code_no_to_change === "" ||
    updated_product_details === {} ||
    updated_product_details === null)
    return [400, "Bad Request!", "Specify Product Correctly"];

  const {
    product_category,
    product_sub_category,
    product_image,
    product_gold_kt,
    product_stamp,
    product_gross_wt,
    product_gold_wt,
    product_dia_pcs,
    product_dia_wt,
    product_dia_qt,
    product_color,
    product_qty,
    product_karigar_name,
    // product_total_gold_wt,
    // product_total_dia_wt,
    product_mrp,
    // product_total_amount,
    product_certificate_no } = updated_product_details;

  // Build product_fields Object

  let product_fields = {};
  if (product_category) product_fields.product_category = product_category;
  if (product_sub_category) product_fields.product_sub_category = product_sub_category;

  // if (product_image) product_fields.product_image = product_image;
  // if image is changed needs to be deleted first and then uploded again here

  if (product_gold_kt) product_fields.product_gold_kt = product_gold_kt;
  if (product_stamp) product_fields.product_stamp = product_stamp;
  if (product_gross_wt) product_fields.product_gross_wt = product_gross_wt;
  if (product_gold_wt) product_fields.product_gold_wt = product_gold_wt;
  if (product_dia_pcs) product_fields.product_dia_pcs = product_dia_pcs;
  if (product_dia_wt) product_fields.product_dia_wt = product_dia_wt;
  if (product_dia_qt) product_fields.product_dia_qt = product_dia_qt;
  if (product_color) product_fields.product_color = product_color;
  if (product_qty) product_fields.product_qty = product_qty;
  if (product_karigar_name) product_fields.product_karigar_name = product_karigar_name;
  // if (product_total_gold_wt) product_fields.product_total_gold_wt = product_total_gold_wt;
  // if (product_total_dia_wt) product_fields.product_total_dia_wt = product_total_dia_wt;
  if (product_mrp) product_fields.product_mrp = product_mrp;
  // if (product_total_amount) product_fields.product_total_amount = product_total_amount;
  if (product_certificate_no) product_fields.product_certificate_no = product_certificate_no;

  try {
    const updated_product = await products.findOneAndUpdate({
      product_code_no: product_code_no_to_change
    },
      {
        $set: product_fields
      },
      {
        new: true,
      }
    );
    if (!updated_product) return [404, "Not Updated!", "Product Doesn't Exist, and can't be updated"];
    return [202, updated_product, "Successfully Updated Product Details."];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};

exports.delete_product = async (product_code_no) => {
  if (product_code_no === "" ||
    product_code_no === null)
    return [400, "Bad Request!", "Specify Product Correctly"];
  try {
    const deleted_product = await products.findOneAndRemove({
      product_code_no,
    });
    if (!deleted_product) return [404, "Not Deleted!", "Product Can't be Deleted!"];

    // image also needs to be delete from S3 bucket.

    return [202, deleted_product, "Successfully Deleted Product."];
  } catch (err) {
    console.error(err.message);
    return [500, err.message, "Server Error!"];
  }
};