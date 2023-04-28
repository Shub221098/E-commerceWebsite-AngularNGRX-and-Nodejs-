const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const Product = require('../../model/product.model');
// const User = require('../../model/user.model');
// const Review = require('../../model/review.model');
// const Cart = require('../../model/cart.model');
const Order = require('../../model/order.model');

dotenv.config({
  path: './config.env',
});
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection established');
  });

// Read JSON FILE
// const product = JSON.parse(fs.readFileSync(`${__dirname}/product.json`, 'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const carts = JSON.parse(fs.readFileSync(`${__dirname}/carts.json`, 'utf-8'));
const orders = JSON.parse(fs.readFileSync(`${__dirname}/orders.json`, 'utf-8'));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
// );
console.log(__dirname);
// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    // await Product.create(product);
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    // await Cart.create(carts);
    await Order.create(orders);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
const deleteData = async () => {
  try {
    // await Product.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    // await Cart.deleteMany();
    await Order.deleteMany();
    console.log('Data Successfully Deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === '--import') {
  console.log('Hello');
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
// node dev-data/data/import-dev-data.js --import