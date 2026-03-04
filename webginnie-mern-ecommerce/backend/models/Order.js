const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'orders.json');

function getOrders() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function saveOrders(orders) {
  fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
}

module.exports = {
  getOrders,
  saveOrders,
};
