const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = 5000;
const SECRET = 'your_jwt_secret_key';

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected")).catch(console.error);

app.use(cors());
app.use(express.json());

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String
});

const OrderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  cart: Array,
  address: String,
  status: { type: String, default: 'Processing' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const Order = mongoose.model('Order', OrderSchema);

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access denied");
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(400).send("Invalid token");
  }
};


// Signup
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).send("User already exists");
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });
  res.send({ message: "User created" });
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid credentials");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send("Invalid credentials");
  const token = jwt.sign({ _id: user._id, email: user.email }, SECRET);
  res.send({ user, token });
});

// Get Products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// Create Product
app.post('/api/products', authMiddleware, async (req, res) => {
  const product = await Product.create(req.body);
  res.send(product);
});

// Update Product
app.put('/api/products/:id', authMiddleware, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});

// Delete Product
app.delete('/api/products/:id', authMiddleware, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send({ message: "Product deleted" });
});

// Place Order
app.post('/api/orders', authMiddleware, async (req, res) => {
  const { cart, address } = req.body;
  const order = await Order.create({ userId: req.user._id, cart, address });
  res.send(order);
});

// Get Orders (for user)
app.get('/api/orders', authMiddleware, async (req, res) => {
  const orders = await Order.find({ userId: req.user._id });
  res.send(orders);
});

// Mock Payment Endpoint
app.post('/api/payment', authMiddleware, (req, res) => {
  res.send({ success: true, paymentId: "mock_payment_123" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:5000`));
