const nodemailer = require("nodemailer");
const Order = require("../model/order.model");
const Product = require("../model/product.model");
const factory = require("./handlerFactory");
const catchAsync = require("../catchAsync");
const { createInvoice } = require("./createInvoice");
const User = require("../model/user.model");

// ************************************** SETPRODUCT/USER ID *****************************************
exports.setProductUserIds = (req, res, next) => {
  // nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.userId = req.user.id;
  next();
};


// *********************************** GET USERS WHO ARE BUYING HIGHER *******************************
exports.getMostSellUser = catchAsync(async (req, res) => {
  const mostSellUser = await Order.aggregate([
    {
      $addFields: {
        buyProduct: "$totalQuantity",
        totalPrice: "$totalPrice",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userArray",
        pipeline: [
          {
            $project: {
              id: "$_id",
              name: 1,
              _id: 0,
            },
          },
        ],
      },
    },
    {
      $project: {
        buyProduct: 1,
        user: { $arrayElemAt: ["$userArray", 0] },
        items: 1,
        totalPrice: 1,
      },
    },
    {
      $sort: { buyProduct: -1 },
    },
    { $limit: 10 },
  ]);
  res.status(200).json(mostSellUser);
});


// *********************************** GET MOST SELL PRODUCT *****************************************
exports.getProductsHaveMostSell = catchAsync(async (req, res) => {
  const productMostSell = await Order.aggregate([
    { $unwind: "$items" },

    // Group by product id and sum the quantity for each product
    {
      $group: {
        _id: "$items.productId",
        productName: { $first: "$items.productName" },
        totalProductPrice: { $first: "$items.totalProductPrice" },
        totalQuantity: { $sum: "$items.totalProductQuantity" },
      },
    },

    // Sort by the total quantity in descending order
    { $sort: { totalQuantity: -1 } },

    // Limit the result to the top 5 products
    { $limit: 5 },
  ]);
  res.status(200).json(productMostSell);
});

// ***************************************** GET YEARLY SALES TOTAL ***********************************

exports.getYearlyIncome = catchAsync(async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const previousYear = new Date(
    new Date().setFullYear(lastYear.getFullYear() - 1)
  );
  const income = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: previousYear,
        },
      },
    },
    {
      $project: {
        year: { $year: "$createdAt" },
        sales: "$totalPrice",
      },
    },
    {
      $group: {
        _id: "$year",
        total: { $sum: "$sales" },
      },
    },
  ]);
  res.status(200).json(income);
});

// ************************************ GET MONTHLY SALES TOTAL ******************************************
exports.getMonthlyIncome = catchAsync(async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth()));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  console.log("nynynynyy", lastMonth, previousMonth);
  const income = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: previousMonth,
        },
      },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$totalPrice",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);
  res.status(200).json(income);
});

// ******************************************* GET DAILY INCOME ***************************************

exports.getDailyIncome = catchAsync(async (req, res) => {
  const todayDate = new Date();
  const yesterdayDate = new Date(todayDate.setDate(todayDate.getDate()));
  const previousDate = new Date(
    new Date().setDate(yesterdayDate.getDate() - 2)
  );
  console.log(todayDate, "", yesterdayDate, "", previousDate);
  const income = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: previousDate,
        },
      },
    },
    {
      $project: {
        date: "$createdAt",
        sales: "$totalPrice",
      },
    },
    {
      $group: {
        _id: "$date",
        total: { $sum: "$sales" },
      },
    },
  ]);
  console.log(income);
  res.status(200).json(income);
});

// ************************************** GET ORDERS COUNT ********************************************
exports.getTotalOrders = catchAsync(async (req, res) => {
  const totalOrder = await Order.aggregate([
    {
      $count: "totalOrders",
    },
  ]);
  console.log(totalOrder)
  res.status(200).json(totalOrder)
});

// ***************************************** GET ALL ORDERS  *****************************************

exports.getAllOrder = factory.getAll(Order);

// ******************************************* GET ORDERS **********************************************
exports.getOrder = factory.getOne(Order);

// ******************************************* CREATE ORDER ********************************************
// Create Order in Database And Sent An Invoice via Email.
exports.createOrder = catchAsync(async (req, res, next) => {
  const cartProducts = req.body.items;
  // Loop through each product in the cart
  for (const cartProduct of cartProducts) {
    // Get the product details from the Product model using the productId
    const product = await Product.findById(cartProduct.productId);

    // Update the stock of the product in the Product model
    product.stock -= cartProduct.totalProductQuantity;

    // Save the updated product details in the Product model
    await product.save();
  }
  const user = await User.findOne({ _id: req.body.userId });
  console.log(user, "from here");
  const doc = await Order.create(req.body);

  createInvoice(doc, user, "invoice.pdf");

  // 1. Create a transporter
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const message = {
      from: "Colafee <paretashubham2210@gmail.com>",
      to: user.email,
      subject:
        "Your Orders Detail Purchase from Colafee. Thanks You Visit again",
      attachments: [
        {
          filename: `invoice.pdf`,
          path: `invoice.pdf`,
          contentType: "application/pdf",
        },
      ],
    };
    // 3. Actually send the email

    await transporter.sendMail(message).catch((err) => console.log(err));
    res.status(200).json({
      status: "success",
      message: "Invoice send to email!",
    });
  } catch (err) {
    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});
