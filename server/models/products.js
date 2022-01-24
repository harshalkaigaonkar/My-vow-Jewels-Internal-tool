const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = Schema({
 product_code_no: {
  type: String,
  required: true,
  unique: true,
 },
 product_category: {
  type: Schema.Types.ObjectId,
  ref: "categories",
  required: true
 },
 product_sub_category: {
  type: Schema.Types.ObjectId,
  ref: "sub-categories",
  required: true
 },
 product_image: {
  data: Buffer,
  contentType: String,
  required: false,
 },
 product_gold_kt: {
  type: String,
  default: "0",
 },
 product_stamp: {
  type: String,
  default: "0"
 },
 product_gross_wt: {
  type: String,
  default: "0"
 },
 product_gold_wt: {
  type: String,
  default: "0"
 },
 product_dia_pcs: {
  type: String,
  default: "0"
 },
 product_dia_wt: {
  type: String,
  default: "0"
 },
 product_dia_qt: {
  type: String,
  default: "-"
 },
 product_color: {
  type: String,
  default: "-"
 },
 product_qty: {
  type: Number,
  required: true,
  default: 0,
 },
 product_karigar_name: {
  type: String,
  default: "-"
 },
 // product_total_gold_wt: {
 //  type: String,
 //  default: "0"
 // },
 // product_total_dia_wt: {
 //  type: String,
 //  default: "0"
 // },
 product_mrp: {
  type: String,
  required: true,
  default: "0"
 },
 // product_total_amount: {
 //  type: String,
 //  required: true,
 //  default: "0"
 // },
 product_certificate_no: {
  type: String,
  default: "-"
 }
},
 {
  timestamps: true
 });

module.exports = mongoose.model('products', product);