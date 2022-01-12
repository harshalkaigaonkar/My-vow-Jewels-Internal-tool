const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = Schema({
 category_type: {
  type: String,
  required: true,
  unique: true,
 }
},
 {
  timestamps: true,
 });

module.exports = mongoose.model('categories', category);