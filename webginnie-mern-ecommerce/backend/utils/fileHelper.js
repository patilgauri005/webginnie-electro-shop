// utils/fileHelper.js
const fs = require('fs');
const path = require('path');

function getFilePath(filename) {
  return path.join(__dirname, '..', 'data', filename);
}

function readData(filename) {
  const filePath = getFilePath(filename);
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeData(filename, data) {
  const filePath = getFilePath(filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  readData,
  writeData,
};
