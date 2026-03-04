const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan'); // For logging requests

// Load environment variables from .env
dotenv.config();

const app = express();

// ==========================
// Middleware
// ==========================
app.use(cors({
  origin: 'http://localhost:5173', // 🔐 Allow only frontend dev origin
  credentials: true
}));

app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev'));  // Log HTTP requests (remove in production)

// Serve static files (e.g. product images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==========================
// Routes
// ==========================
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wishlist', wishlistRoutes);

// ==========================
// Error Handling
// ==========================

// Not Found
app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Server Error
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ message: 'Server error occurred' });
});

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
