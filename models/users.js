const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'the name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'the password is required'],
    min: [3, 'the minimum length is 8 charachter'],
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: {
    type: String,
    default: '/uploads/default.png',
  },
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.ComparePassword = function async(
  enterdPassword,
) {
  return bcrypt.compare(enterdPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
