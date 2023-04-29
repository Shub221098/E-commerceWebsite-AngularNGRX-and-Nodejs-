const catchAsync = require("../catchAsync");
const factory = require("./handlerFactory");
const Product = require("../model/product.model");
const path = require("path");
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

exports.uploadUserPhoto = upload.single("file");

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.tempfilename = Date.now() + "_" + req.file.originalname;
  req.file.filename = `http://localhost:6002/api/v1/products/images/${req.file.tempfilename}`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/products/${req.file.tempfilename}`);
  next();
};
exports.getImages = catchAsync(async (req, res) => {
  const options = path.join(__dirname, "..", "public", "img", "products");

  const fileName = req.params.id;
  res.sendFile(options + "/" + fileName);
});
exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product, { path: "reviews" });
exports.createProduct = catchAsync(async (req, res) => {
  const product = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    brand: req.body.brand,
    price: req.body.price,
    discountPrice: req.body.discountPrice,
    stock: req.body.stock,
    mainImage: req.file.filename,
  };
  console.log(product);
  const doc = await Product.create(product);
  console.log(doc);
  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
exports.deleteProduct = factory.deleteOne(Product);
exports.updateProduct = catchAsync(async (req, res) => {
  let product;
  if (req.file) {
    product = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      brand: req.body.brand,
      price: req.body.price,
      discountPrice: req.body.discountPrice,
      stock: req.body.stock,
      mainImage: req.file.filename,
    };
  } 
  const doc = await Product.findOneAndUpdate({ _id: req.params.id }, product, {
    new: true,
    runValidators: true,
  });
  // product = {
  //   _id : doc.get('id'),
  //   name : doc.get('name'),
  //   description : doc.get('description'),
  //   category : doc.get('category'),
  //   brand : doc.get('brand'),
  //   price : doc.get('price'),
  //   discountPrice : doc.get('discountPrice'),
  //   stock : doc.get('stock'),
  //   mainImage : doc.get('mainImage'),
  //   quantity : doc.get('quantity'),
  //   active: doc.get('active'),
  //   ratingsAverage : doc.get('ratingsAverage'),
  //   inStock : doc.get('inStock'),
  //   numberofReviews : doc.get('numberofReviews'),
  //   rating: doc.get('rating'),
  //   createdAt : doc.get('createdAt'),
  // }
  console.log("bybyby", product)
  res.status(200).json({
    product
  });
});

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
