const express = require('express');
const { get_categories,
 get_category,
 add_category,
 update_category,
 delete_category
} = require('../database/functions/categories');
const router = express.Router();

// @route    GET /categories/get
// @desc     Get All Categories
// @access   Private
// @params   type:string (only be "all","once")
// @body     category_type:string|null
router.get('/get', async (req, res) => {

 /*BODY AND QUERY VARIABLES : START */

 const query = req.query;
 const body = req.body;

 const type = query.type;
 const category_type = body.category_type;

 /*BODY AND QUERY VARIABLES : END */

 try {
  let categories = [];
  if (type === "all") {
   categories = await get_categories();
  } else {
   if (type === "once") {
    categories = await get_category(category_type);
   }
  }
  // error response
  if (!categories || categories === [])
   res.status(400).json({
    "error": "Category cannot be fetched!"
   });
  // success reponse
  res.status(categories[0]).json({
   status: categories[0],
   data: categories[1],
   info: categories[2],
  })
 } catch (err) {
  console.error(err.message);
  res.status(500).json({
   "error": err.message
  });
 };
});

// @route    POST /categories/add
// @desc     Add a Category
// @access   Private
// @body     category_type:string
router.post('/add', async (req, res) => {

 /*BODY AND QUERY VARIABLES : START */

 const body = req.body;

 const category_type = body.category_type;

 /*BODY AND QUERY VARIABLES : END */

 try {
  const category = await add_category(category_type);
  // error response
  if (!category || category === [])
   res.status(400).json({
    "error": "Category cannot be added!"
   });
  // success reponse
  res.status(category[0]).json({
   status: category[0],
   data: category[1],
   info: category[2],
  })
 } catch (err) {
  console.error(err.message);
  res.status(500).json({
   "error": err.message
  });
 };
});

// @route    PATCH /categories/update
// @desc     Update a Category
// @access   Private
// @body     prev_category_type:string, updated_category_type:string
router.patch('/update', async (req, res) => {

 /*BODY AND QUERY VARIABLES : START */

 const body = req.body;

 const prev_category_type = body.prev_category_type;
 const updated_category_type = body.updated_category_type;

 /*BODY AND QUERY VARIABLES : END */
 try {
  const category = await update_category(prev_category_type, updated_category_type);
  // error response
  if (!category || category === [])
   res.status(400).json({
    "error": "Category cannot be updated!"
   });
  // success reponse
  res.status(category[0]).json({
   status: category[0],
   data: category[1],
   info: category[2],
  })
 } catch (err) {
  console.error(err.message);
  res.status(500).json({
   "error": err.message
  });
 };
});

// @route    DELETE /categories/delete
// @desc     delete a Category
// @access   Private
// @body     category_type
router.delete('/delete', async (req, res) => {
 /*BODY AND QUERY VARIABLES : START */

 const body = req.body;

 const category_type_to_delete = body.category_type;

 /*BODY AND QUERY VARIABLES : END */
 try {
  const category = await delete_category(category_type_to_delete);
  // error response
  if (!category || category === [])
   res.status(400).json({
    "error": "Category cannot be deleted!"
   });
  // success reponse
  res.status(category[0]).json({
   status: category[0],
   data: category[1],
   info: category[2],
  })
 } catch (err) {
  console.error(err.message);
  res.status(500).json({
   "error": err.message
  });
 };
});

module.exports = router;