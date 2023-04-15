const mongoose = require("mongoose");
const Product = require("./product.model");
const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review cannot be empty!"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      numberofReviews: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      numberofReviews: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post("save", function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.product);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findByIdAnd/, async function (next) {
  this.rev = await this.findOne();
  next();
});

reviewSchema.post(/^findByIdAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.rev.constructor.calcAverageRatings(this.rev.product);
});

module.exports = mongoose.model("Review", reviewSchema);
