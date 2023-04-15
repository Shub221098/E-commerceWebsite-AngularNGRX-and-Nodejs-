const nodemailer = require("nodemailer");
const Order = require("../model/order.model");
const factory = require("./handlerFactory");
const catchAsync = require("../catchAsync");
const { createInvoice } = require("./createInvoice");

exports.setProductUserIds = (req, res, next) => {
  // nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getMostSellUser = catchAsync(async (req, res) => {
  const mostSellUser = await Order.aggregate([
    {
      $addFields: {
        buyProduct: "$totalQuantity",
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
      },
    },
    {
      $sort: { buyProduct: -1 },
    },
  ]);
  res.status(200).json({
    type: "success",
    mostSellUser,
  });
});

/*(only admin)*/
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
  res.status(200).json({
    type: "success",
    income,
  });
});

exports.getMonthlyIncome = catchAsync(async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  console.log(date, "", lastMonth, "", previousMonth);
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
  res.status(200).json({
    type: "success",
    income,
  });
});

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
  res.status(200).json({
    type: "success",
    income,
  });
});

// *****************************************************************************************************

exports.getAllOrder = factory.getAll(Order);
exports.getOrder = factory.getOne(Order);
exports.cancelOrder = factory.deleteOne(Order);

// Create Order in Database And Sent An Invoice via Email.
exports.createOrder = catchAsync(async (req, res, next) => {
  const doc = await Order.create(req.body);
  createInvoice(doc, "invoice.pdf");

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
      from: "Shubham Pareta <paretashubham2210@gmail.com>",
      to: req.body.email,
      subject:
        "Your Orders Detail Purchase from Flipkart. Thanks You Visit again",
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
  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
