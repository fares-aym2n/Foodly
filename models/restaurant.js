const mongoose = require('mongoose');
const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Restaurant must has a name'],
    },
    description: {
      type: String,
      required: [true, 'Restaurant must has a description'],
    },
    address: {
      type: String,
      required: [true, 'Restaurant must has a address'],
    },
    phone: {
      type: String,
    },
    rating: {
      type: Number,
      default: 5,
      min: [1, 'the rating must be atleast 1'],
      max: [5, 'the rating must be atmost 5'],
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: String,
      required: [true, 'Restaurant must belong to owner'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id:false,
  },
);

RestaurantSchema.virtual('category', {
  ref: 'Category',
  foreignField: 'restaurant',
  localField: '_id',
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;
