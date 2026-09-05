const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Food must has a name'],
    },
    description: {
      type: String,
      required: [true, 'Food must has a description'],
    },
    price: {
      type: Number,
      required: [true, 'Food must has a price'],
      min: [5, 'Price Must be atleast 5$'],
    },
    rating: {
      type: Number,
      default: 5,
      min: [1, 'the rating must be atleast 1'],
      max: [5, 'the rating must be atmost 5'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
    },
    restaurant: {
      type: mongoose.Schema.ObjectId,
      ref: 'Restaurant',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  },
);

foodSchema.pre(/^find/, function () {
  this.populate({
    path: 'category',
    select: 'name',
  }).populate({
    path: 'restaurant',
    select: 'name address',
  });
});
const Food = mongoose.model('Food', foodSchema);
module.exports = Food;
