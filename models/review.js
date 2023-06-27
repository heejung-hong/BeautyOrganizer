// 3.2.1 set up mongoose schema for reviews
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewRating: {
    type: Number,
    required: true
  },
  reviewDescription: {
    type: String,
    required: true
  },
  reviewDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = reviewSchema;
