const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;