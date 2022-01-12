const express = require('express');
const { get_products_based_on_category,
  get_products_all,
  get_product_one,
  add_product,
  update_product,
  delete_product
} = require('../database/functions/products');
const router = express.Router();

// @route    GET /products/get
// @desc     Get Product Details
// @access   Private
// @params   type:string (can be "all","category","once")
// @body     category_type:string|null , product_code_no:string|null 
router.get('/get', async (req, res) => {

  /*BODY AND QUERY VARIABLES : START */

  const query = req.query;
  const body = req.body;

  const type = query.type;
  const category_type = body.category_type;
  const product_code_no = body.product_code_no;

  /*BODY AND QUERY VARIABLES : END */

  try {
    let products = [];
    if (type === "category") {
      products = await get_products_based_on_category(category_type);
    }
    else if (type === "all") {
      products = await get_products_all();
    }
    else {
      if (type === "once")
        products = await get_product_one(product_code_no);
    };
    // error response
    if (!products || products === []) res.status().json({
      "error": "Products cannot be fetched!"
    });
    // success response
    res.status(products[0]).json({
      status: products[0],
      data: products[1],
      info: products[2],
    });
  } catch (err) {
    // server error response
    console.error(err.message);
    res.status(500).json({
      "error": err.message
    });
  };
});

// @route    POST /products/add
// @desc     Add Product Details
// @access   Private
// @body     product_details: object
router.post('/add', async (req, res) => {

  /*BODY AND QUERY VARIABLES : START */

  const body = req.body;

  const product_details = body.product_details;

  /*BODY AND QUERY VARIABLES : END */
  try {
    const new_product = await add_product(product_details);
    // error response
    if (!new_product)
      res.status(400).json({
        "error": "Product cannot be added!"
      });
    // success reponse
    res.status(new_product[0]).json({
      status: new_product[0],
      data: new_product[1],
      info: new_product[2],
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      "error": err.message
    });
  };
});

// @route    PATCH /products/upadate
// @desc     Update Product Details
// @access   Private
// @params   product_code_no: string
// @body     updated_details: object
router.patch('/update', async (req, res) => {

  /*BODY AND QUERY VARIABLES : START */
  const query = req.query;
  const body = req.body;

  const product_code_no = query.product_code_no;
  const updated_details = body.updated_details;

  /*BODY AND QUERY VARIABLES : END */

  try {
    const updated_product = await update_product(product_code_no, updated_details);
    // error response
    if (!updated_product)
      res.status(400).json({
        "error": "Product cannot be Updated!"
      });
    // success reponse
    res.status(updated_product[0]).json({
      status: updated_product[0],
      data: updated_product[1],
      info: updated_product[2],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      "error": err.message
    });
  };
});

// @route    DELETE /products/delete
// @desc     Delete Product Details
// @access   Private
// @params   product_code_no:string
router.delete('/delete', async (req, res) => {

  /*BODY AND QUERY VARIABLES : START */

  const query = req.query;

  const product_code_no = query.product_code_no;

  /*BODY AND QUERY VARIABLES : END */
  try {
    const deleted_product = await delete_product(product_code_no);
    // error response
    if (!deleted_product)
      res.status(400).json({
        "error": "Product cannot be Deleted!"
      });
    // success reponse
    res.status(deleted_product[0]).json({
      status: deleted_product[0],
      data: deleted_product[1],
      info: deleted_product[2],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      "error": err.message
    });
  }
});

module.exports = router;