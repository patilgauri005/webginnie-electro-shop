const { readData, writeData } = require('../utils/fileHelper');
const WISHLIST_FILE = 'wishlist.json';

exports.getWishlist = (req, res) => {
  const userId = req.user.id;
  const allWishlists = readData(WISHLIST_FILE);
  const wishlist = allWishlists[userId] || [];
  res.json(wishlist);
};

exports.addToWishlist = (req, res) => {
  const userId = req.user.id;
  const product = req.body;
  const allWishlists = readData(WISHLIST_FILE);

  const userWishlist = allWishlists[userId] || [];

  // Check if product already exists
  const alreadyExists = userWishlist.some(item => String(item.id) === String(product.id));
  if (!alreadyExists) {
    userWishlist.push(product);
    allWishlists[userId] = userWishlist;
    writeData(WISHLIST_FILE, allWishlists);
  }

  res.json(allWishlists[userId]);
};

exports.removeFromWishlist = (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId; // Use as string for consistency
  const allWishlists = readData(WISHLIST_FILE);
  const userWishlist = allWishlists[userId] || [];

  // Check existence
  const productExists = userWishlist.some(item => String(item.id) === String(productId));
  if (!productExists) {
    return res.status(404).json({ message: 'Product not found in wishlist' });
  }

  const updatedWishlist = userWishlist.filter(item => String(item.id) !== String(productId));

  allWishlists[userId] = updatedWishlist;
  writeData(WISHLIST_FILE, allWishlists);

  res.json(updatedWishlist);
};
