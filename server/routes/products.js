const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const { get_products_based_on_category,
  get_products_all,
  get_product_one,
  add_product,
  update_product,
  delete_product
} = require('../database/functions/products');
const router = express.Router();

// multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './routes/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') cb(null, true);
  else cb(null, false);
}

const upload = multer({ storage, fileFilter });


// @route    GET /products/get
// @desc     Get Product Details
// @access   Private
// @params   type:string (can be "all","category","once")
// @body     category_type:string|null, sub_category_type:string|null , product_code_no:string|null 
router.get('/get', async (req, res) => {

  /*BODY AND QUERY VARIABLES : START */

  const query = req.query;

  const type = query.type;
  const category_type = query.category_type;
  const sub_category_type = query.sub_category_type;
  const product_code_no = query.product_code_no;

  /*BODY AND QUERY VARIABLES : END */

  try {
    let products = [];
    if (type === "category") {
      products = await get_products_based_on_category(category_type, sub_category_type);
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
    console.log('yaha aaya')
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
router.post('/add', upload.single('product_image'), async (req, res) => {

  /*BODY AND QUERY VARIABLES : START */

  const body = req.body;
  const file = req.file;

  // product_image data as buffer
  let product_image;
  if (file)
    product_image = {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + file.filename)),
      contentType: `${file.mimetype}`
    }

  // creating product_details object
  const product_details = {};
  product_details.product_code_no = body.product_code_no;
  product_details.product_category = body.product_category;
  product_details.product_sub_category = body.product_sub_category;
  product_details.product_image = file ? product_image : undefined;
  product_details.product_gold_kt = body.product_gold_kt;
  product_details.product_stamp = body.product_stamp;
  product_details.product_gross_wt = body.product_gross_wt;
  product_details.product_gold_wt = body.product_gold_wt;
  product_details.product_dia_pcs = body.product_dia_pcs;
  product_details.product_dia_wt = body.product_dia_wt;
  product_details.product_dia_qt = body.product_dia_qt;
  product_details.product_color = body.product_color;
  product_details.product_qyt = body.product_qyt;
  product_details.product_karigar_name = body.product_karigar_name;
  product_details.product_mrp = body.product_mrp;
  product_details.product_certificate_no = body.product_certificate_no;

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