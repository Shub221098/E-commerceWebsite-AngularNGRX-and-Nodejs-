const catchAsync = require("../catchAsync");
const appError = require("../appError");
const apiFeatures = require("../apifeatures");

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    // To allow for nested Get Reviews on tour
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };
    if (req.params.userId) filter = { userId: req.params.userId };
    const features = new apiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;
    console.log(doc)
    // const doc = await features.query.explain();
    res.status(200).json(
      // status: "success",
      // requestedAt: req.requestTime,
      // results: doc.length,
      doc
    );
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(new appError("No document found with that Id", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let id = req.params.id;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new appError("No document found with that Id", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    console.log(doc);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.params.id, req.body)
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new appError("No document found with that Id", 404));
    }
    res.status(200).json({
      status: "success",
      doc
    });
  });
