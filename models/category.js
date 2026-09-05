const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category must has a name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Category must have a description'],
      trim: true,
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
CategorySchema.virtual('food', {
  ref: 'Food',
  foreignField: 'category',
  localField: '_id',
});


const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
