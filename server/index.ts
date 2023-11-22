import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
const { Product, Cart, Category, Order } = require('./models');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/fullstack-challenge');

app.get('/add-category', async (req: Request, res: Response) => {
  const categories = [
    {
      name: 'One'
    },
    {
      name: 'Tow'
    },
    {
      name: 'three'
    }
  ];
  const newCategories = await Category.insertMany(categories);
  return res.json(newCategories);
});

app.get('/add-products', async (req: Request, res: Response) => {
  const categories = await Category.find();
  const products: {
    category: string;
    name: string;
    price: number;
    
  }[] = [];
  for (const category of categories) {
    products?.push({
      category: category?._id,
      name: category?.name + ' - Product',
      price: Math.round(Math.random() * 10000)
    });
  }
  const newProducts = await Product.insertMany(products);
  res.json(newProducts);
});

app.get('/products', async (req: Request, res: Response) => {
  const products = await Product.find().populate('category');
  res.json(products);
});

app.get('/cart', async (req: Request, res: Response) => {
  const cartItems = await Cart.find().populate('productId');
  res.json(cartItems);
})

app.post('/cart/add/:productId', async (req: Request, res: Response) => {
  const { productId } = req.params;
  const cartItem = await Cart.findOne({ productId });
  if (cartItem) {
    cartItem.quantity++;
    await cartItem.save();
  } else {
    const newCartItem = new Cart({ productId, quantity: 1 });
    await newCartItem.save();
  }
  res.json({ message: 'Product added to cart' });
});

app.put(
  '/cart/update/:productId/:quantity',
  async (req: Request, res: Response) => {
    const { productId, quantity } = req.params;
    const cartItem = await Cart.findOne({ productId });
    if (cartItem) {
      if (quantity as any == 0) {
        await Cart.deleteOne({ productId });
      } else {
        cartItem.quantity = quantity;
        await cartItem.save();
      }
    }
    res.json({ message: 'Product quantity updated' });
  }
);

app.post('/cart/mock-payment', async (req: Request, res: Response) => {
  const cartItems = await Cart.find();
  const { totalPrice, customerDetail } = req.body;
  const newPurchaseHistory = new Order({ totalItems: cartItems.length, totalAmount: totalPrice, customerDetail });
  await newPurchaseHistory.save();
  await Cart.deleteMany();
  res.json({ message: 'Mock payment successful' });
});

app.get('/purchase-history', async (req: Request, res: Response) => {
  const purchaseHistory = await Order.find();
  res.json(purchaseHistory);
});

app.listen(4344, () => {
  console.log('Server started on port 4344');
});
