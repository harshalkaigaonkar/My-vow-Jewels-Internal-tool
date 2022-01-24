const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bills = Schema({
 creation_date: {
  type: Date,
  default: Date.now(),
 },
 customer_name: {
  type: String,
  required: true,
 },
 customer_phone: {
  type: String,
 },
 customer_place: {
  type: String,
 },
 bill_no: {
  type: String,
  required: true,
  unique: true
 },
 items: [{
  product: {
   type: Schema.Types.ObjectId,
   ref: 'products',
  },
  product_code: {
   type: String,
   required: true,
  },
  qty: {
   type: String,
   required: true,
   default: "0"
  },
  wt: {
   type: String,
   required: true,
   default: "0.00"
  },
  amt: {
   type: String,
   required: true,
   default: "0.00"
  }
 }],
 total: {
  type: String,
  required: true,
  default: "0.00"
 },
 cgst: {
  type: String,
  required: true,
  default: "0.00"
 },
 sgst: {
  type: String,
  required: true,
  default: "0.00"
 },
 igst: {
  type: String,
  required: true,
  default: "0.00"
 },
 total_gst: {
  type: String,
  required: true,
  default: "0.00"
 },
 advance: {
  type: String,
  required: true,
  default: "0.00"
 },
 discount: {
  type: String,
  required: true,
  default: "0.00"
 },
 grand_total: {
  type: String,
  required: true,
  default: "0.00"
 }
}, {
 timestamps: true
});

module.exports = mongoose.model('bills', bills);