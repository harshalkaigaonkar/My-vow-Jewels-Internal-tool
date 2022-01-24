const express = require('express');
const { get_bills_based_on_timeline,
  add_bill,
  get_bill_once,
  get_bills_all,
  update_bill,
  deleted_bill } = require('../database/functions/bills');
const { get_product_one, update_product } = require('../database/functions/products');
const router = express.Router();

// @route    GET /bills/get
// @desc     Get Bills Details
// @access   Private
// @params   type:string (can be "all","timeline","once")
// @body     bill_no:string|null , date:number|null, month:number|null, year:number|null 
router.get('/get', async (req, res) => {

  /*BODY AND QUERY VARIABLES : START */

  const query = req.query;
  // const body = req.body;

  const type = query.type;
  const bill_no = query.bill_no;
  const date = query.date;
  const month = query.month;
  const year = query.year;

  /*BODY AND QUERY VARIABLES : END */

  try {
    let bills = [];
    if (type === "timeline") {
      bills = await get_bills_based_on_timeline(date, month, year);
    }
    else if (type === "all") {
      bills = await get_bills_all();
    }
    else {
      if (type === "once")
        bills = await get_bill_once(bill_no);
    };
    // error response
    if (!bills || bills === []) res.status().json({
      "error": "Bills cannot be fetched!"
    });
    // success response
    res.status(bills[0]).json({
      status: bills[0],
      data: bills[1],
      info: bills[2],
    });
  } catch (err) {
    // server error response
    console.error(err.message);
    res.status(500).json({
      "error": err.message
    });
  };
});

// @route    POST /bills/add
// @desc     Add BIll Details
// @access   Private
// @body     bill_details: object
router.post('/add', async (req, res) => {

  /*BODY AND QUERY VARIABLES : START */

  const body = req.body;

  const bill_details = body.bill_details;

  /*BODY AND QUERY VARIABLES : END */
  try {
    const new_bill = await add_bill(bill_details);
    // error response
    if (!new_bill)
      res.status(400).json({
        "error": "Product cannot be added!"
      });
    //  remove stock from inventory
    let items = new_bill[1].items;
    for (let i = 0; i < items.length; i++) {
      const productCode = items[i].product_code;
      const product = await get_product_one(productCode);
      const productQty = product[1].product_qty - items[i].qty;
      const updated_product = await update_product(productCode, { product_qty: productQty });
      if (update_product[0] === 500 || updated_product[0] === 404 || updated_product[0] === 400)
        res.status(400).json({
          "error": "Product cannot be added!"
        });
    }
    // success reponse
    res.status(new_bill[0]).json({
      status: new_bill[0],
      data: new_bill[1],
      info: new_bill[2],
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      "error": err.message
    });
  };
});

// @route    PATCH /bills/update
// @desc     Update Bill Details
// @access   Private
// @params   bill_no: string
// @body     updated_bill_details: object
router.patch('/update', async (req, res) => {

  /*BODY AND QUERY VARIABLES : START */
  const query = req.query;
  const body = req.body;

  const bill_no = query.bill_no;
  const updated_bill_details = body.updated_bill_details;

  /*BODY AND QUERY VARIABLES : END */

  try {
    const updated_bill = await update_bill(bill_no, updated_bill_details);
    // error response
    if (!updated_bill)
      res.status(400).json({
        "error": "Product cannot be Updated!"
      });
    // success reponse
    res.status(updated_bill[0]).json({
      status: updated_bill[0],
      data: updated_bill[1],
      info: updated_bill[2],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      "error": err.message
    });
  };
});

// @route    DELETE /bills/delete
// @desc     Delete Bill Details
// @access   Private
// @params   bill_no:string
router.delete('/delete', async (req, res) => {

  /*BODY AND QUERY VARIABLES : START */

  const query = req.query;

  const bill_no = query.bill_no;

  /*BODY AND QUERY VARIABLES : END */
  try {
    const deleted_product = await deleted_bill(bill_no);
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