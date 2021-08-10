const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Owner = new Schema({
    id:Number,
    name:String,
 });

module.exports = Owner