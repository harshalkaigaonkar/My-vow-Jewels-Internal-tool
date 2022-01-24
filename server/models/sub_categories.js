const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sub_category = Schema({
 sub_category_type: {
  type: String,
  required: true,
  unique: true
 }
},
 {
  timestamps: true,
 });

module.exports = mongoose.model('sub-categories', sub_category);