const express = require('express');
const { get_sub_categories, get_sub_categories_once, add_sub_category, update_sub_category, delete_sub_category } = require('../database/functions/sub_categories');
const router = express.Router();

// @route    GET /sub_categories/get
// @desc     Get Sub_Category
// @access   Private
// @params   type:string (only be "all","once")
// @body     sub_category_type:string|null
router.get('/get', async (req, res) => {

 /*BODY AND QUERY VARIABLES : START */

 const query = req.query;
 const body = req.body;

 const type = query.type;
 const sub_category_type = body.sub_category_type;

 /*BODY AND QUERY VARIABLES : END */

 try {
  let sub_categories = [];
  if (type === "all") {
   sub_categories = await get_sub_categories();
  } else {
   if (type === "once") {
    sub_categories = await get_sub_categories_once(sub_category_type);
   }
  }
  // error response
  if (!sub_categories || sub_categories === [])
   res.status(400).json({
    "error": "Sub-Category cannot be fetched!"
   });
  // success reponse
  res.status(sub_categories[0]).json({
   status: sub_categories[0],
   data: sub_categories[1],
   info: sub_categories[2],
  })
 } catch (err) {
  console.error(err.message);
  res.status(500).json({
   "error": err.message
  });
 };
});

// @route    POST /sub_categories/add
// @desc     Add a Sub-Category
// @access   Private
// @body     sub_category_type:string
router.post('/add', async (req, res) => {

 /*BODY AND QUERY VARIABLES : START */

 const body = req.body;

 const sub_category_type = body.sub_category_type;

 /*BODY AND QUERY VARIABLES : END */

 try {
  const sub_category = await add_sub_category(sub_category_type);
  // error response
  if (!sub_category || sub_category === [])
   res.status(400).json({
    "error": "Sub-Category cannot be added!"
   });
  // success reponse
  res.status(sub_category[0]).json({
   status: sub_category[0],
   data: sub_category[1],
   info: sub_category[2],
  })
 } catch (err) {
  console.error(err.message);
  res.status(500).json({
   "error": err.message
  });
 };
});

// @route    PATCH /sub_categories/update
// @desc     Update a Sub-Category
// @access   Private
// @body     prev_category_type:string, updated_category_type:string
router.patch('/update', async (req, res) => {

 /*BODY AND QUERY VARIABLES : START */

 const body = req.body;

 const prev_sub_category_type = body.prev_sub_category_type;
 const updated_sub_category_type = body.updated_sub_category_type;

 /*BODY AND QUERY VARIABLES : END */
 try {
  const sub_category = await update_sub_category(prev_sub_category_type, updated_sub_category_type);
  // error response
  if (!sub_category || sub_category === [])
   res.status(400).json({
    "error": "Sub-Category cannot be updated!"
   });
  // success reponse
  res.status(sub_category[0]).json({
   status: sub_category[0],
   data: sub_category[1],
   info: sub_category[2],
  })
 } catch (err) {
  console.error(err.message);
  res.status(500).json({
   "error": err.message
  });
 };
});

// @route    DELETE /sub_categories/delete
// @desc     delete a Sub-Category
// @access   Private
// @body     sub_category_type_to_delete:string|null
router.delete('/delete', async (req, res) => {
 /*BODY AND QUERY VARIABLES : START */

 const body = req.body;

 const sub_category_type_to_delete = body.sub_category_type;

 /*BODY AND QUERY VARIABLES : END */
 try {
  const sub_category = await delete_sub_category(sub_category_type_to_delete);
  // error response
  if (!sub_category || sub_category === [])
   res.status(400).json({
    "error": "Sub-Category cannot be deleted!"
   });
  // success reponse
  res.status(sub_category[0]).json({
   status: sub_category[0],
   data: sub_category[1],
   info: sub_category[2],
  })
 } catch (err) {
  console.error(err.message);
  res.status(500).json({
   "error": err.message
  });
 };
});

module.exports = router;