const { readData, writeData } = require('../utils/fileHelper');

// GET all orders (admin only)
exports.getAllOrders = (req, res) => {
  const orders = readData('orders.json');
  res.json(orders);
};

// GET a single order by ID
exports.getOrderById = (req, res) => {
  const orders = readData('orders.json');
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};

exports.getMyOrders = (req, res) => {
  const orders = readData('orders.json');
  const user = req.user;

  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const userOrders = orders.filter(order => order.customerId === user.id);
  res.json(userOrders);
};

// CREATE a new order
exports.createOrder = (req, res) => {
  const orders = readData('orders.json');
  const user = req.user;
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const {
    items,
    shippingAddress = {},
    paymentMethod = 'cod',
    notes = '',
  } = req.body;

  const subtotal = items.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0);
  const deliveryFee = subtotal > 999 ? 0 : 99;
  const total = subtotal + deliveryFee;

  const newOrder = {
    id: `ORD-${Date.now()}`,
    customerId: user.id,
    customerName: user.name,
    customerEmail: user.email,
    customerPhone: user.phone || '',
    items: items.map(item => ({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.currentPrice,
      quantity: item.quantity,
      category: item.category,
    })),
    shippingAddress,
    paymentMethod,
    subtotal,
    deliveryFee,
    total,
    paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
    status: 'pending',
    trackingNumber: `TRK${Date.now()}`,
    notes,
    orderDate: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  };

  orders.push(newOrder);
  writeData('orders.json', orders);

  res.status(201).json(newOrder);
};

// UPDATE an order
exports.updateOrder = (req, res) => {
  const orders = readData('orders.json');
  const index = orders.findIndex(o => o.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Order not found' });

  orders[index] = { ...orders[index], ...req.body };
  writeData('orders.json', orders);

  res.json({ message: 'Order updated', order: orders[index] });
};

// DELETE an order
exports.deleteOrder = (req, res) => {
  const orders = readData('orders.json');
  const updated = orders.filter(o => o.id !== req.params.id);
  if (updated.length === orders.length)
    return res.status(404).json({ message: 'Order not found' });

  writeData('orders.json', updated);
  res.json({ message: 'Order deleted' });
};
