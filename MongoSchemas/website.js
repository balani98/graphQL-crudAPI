const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Website = new Schema({
    id:Number,
    name:String,
    ownerId:Number

});

module.exports = Website