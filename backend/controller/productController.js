const catchAsync = require("../catchAsync");
const factory = require("./handlerFactory");
const Product = require("../model/product.model");

const sharp = require("sharp");
const multer = require("multer");
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image.Please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
};

// final Separation
exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product, { path: "reviews" });
exports.createProduct = factory.createOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
exports.updateProduct = factory.updateOne(Product);

exports.getProductCategories = catchAsync(async (req, res) => {
  const product = await Product.find();
  const categories = await product.map((p) => p.category);
  const uniqueCategories = [...new Set(categories)];
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: uniqueCategories.length,
    data: uniqueCategories,
  });
});
exports.getProductByCategoryName = catchAsync(async (req, res) => {
  const categories = await Product.find({ category: req.params.categoryName });
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: categories.length,
    data: {
      data: categories,
    },
  });
});
exports.getProductsHaveMostSell = catchAsync(async (req, res) => {
  const productMostSell = await Product.aggregate([
    {
      $addFields: {
        highestSell: {
          $multiply: [{ $divide: ["$stock", "$totalStock"] }, 100],
        },
      },
    },
    {
      $sort: {
        highestSell: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);
  res.status(200).json({
    type: "success",
    productMostSell,
  });
});
exports.getProductHaveLessQuantity = catchAsync(async (req, res) => {
  const quantity = 100;
  const lessQunatityProduct = await Product.aggregate([
    {
      $match: {
        stock: {
          $lte: quantity,
        },
      },
    },
  ]);
  res.status(200).json({
    type: "success",
    lessQunatityProduct,
  });
});

exports.searchProducts = catchAsync(async (req, res) => {
  const query = req.query.q;
  const sort = req.query.sort;
  console.log(sort, query);
  let filter = {};

  if (query) {
    const regexString = query.replace(/\s+/g, "").split("").join("\\s*");
    const regex = new RegExp(regexString, "i");
    filter.$or = [{ name: regex }, { category: regex }, { brand: regex }];
  }
  const sortQuery = {};
  if (sort) {
    const [field, order] = sort.split(":");
    sortQuery[field] = order === "asc" || order === "1" ? 1 : -1;
  }

  const products = await Product.find(filter).sort(sortQuery);
    res.json(products);
});
