const { readData, writeData } = require('../utils/fileHelper');

const getAllProducts = (req, res) => {
  const products = readData('products.json');
  res.json(products);
};

const getProductById = (req, res) => {
  const products = readData('products.json');
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

const createProduct = (req, res) => {
  const products = readData('products.json');
  const newProduct = { ...req.body, id: Date.now().toString() };
  products.push(newProduct);
  writeData('products.json', products);
  res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
  let products = readData('products.json');
  products = products.map(p => p.id === req.params.id ? { ...p, ...req.body } : p);
  writeData('products.json', products);
  res.json({ message: 'Product updated' });
};

const deleteProduct = (req, res) => {
  let products = readData('products.json');
  products = products.filter(p => p.id !== req.params.id);
  writeData('products.json', products);
  res.json({ message: 'Product deleted' });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
