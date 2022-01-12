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
 product_image: {
  type: String,
  default: "no_image.png",
 },
 product_gold_kt: {
  type: String,
  default: "",
 },
 product_stamp: {
  type: String,
  default: ""
 },
 product_gross_wt: {
  type: String,
  default: ""
 },
 product_gold_wt: {
  type: String,
  default: ""
 },
 product_dia_pcs: {
  type: String,
  default: ""
 },
 product_dia_wt: {
  type: String,
  default: ""
 },
 product_dia_qt: {
  type: String,
  default: ""
 },
 product_color: {
  type: String,
  default: ""
 },
 product_mfg_qty: {
  type: Number,
  default: 0,
 },
 product_sale_qty: {
  type: Number,
  default: 0,
 },
 product_bal_qty: {
  type: Number,
  default: 0,
 },
 product_karigar_name: {
  type: String,
  default: ""
 },
 product_total_gold_wt: {
  type: String,
  default: ""
 },
 product_total_dia_wt: {
  type: String,
  default: ""
 },
 product_mrp: {
  type: String,
  default: ""
 },
 product_total_amount: {
  type: String,
  default: ""
 },
 product_certificate_no: {
  type: String,
  default: ""
 },
 product_remarks: {
  type: String,
  default: ""
 }
},
 {
  timestamps: true
 });
// CODE NO	PENDANT	Gold kt	Stamp 	grosswt	Gold WT	dia pcs.	Dia WT	Dia Qt 	Color	Mfg QTY	Sale Qty	Bal Qty	Karigar Name	Total Gold Wt.	Total Dia Pcs	Total Dia Wt.	MRP	Total Amount	Certificate no	Remark 


module.exports = mongoose.model('products', product);