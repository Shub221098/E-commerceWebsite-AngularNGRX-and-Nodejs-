const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
      minlength: [5, "A tour must have more or equal to 5 characters"],
    },

    description: {
      type: String,
      required: [true, "Please provide a product description"],
    },

    price: {
      type: Number,
      required: [true, "Please provide a product price"],
    },
    rating: {
      type: Number,
      default: 3.0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    discountPrice: {
      type: Number,
    },

    category: {
      type: String,
      required: [true, "Please provide a product category"],
    },

    brand: {
      type: String,
      required: [true, "Please provide a product brand"],
    },

    mainImage: {
      type: String,
      required: [true, "A product must have a main image"],
    },
    images: {
      type: [String],
    },
    numberofReviews: {
      type: Number,
      default: 0,
    },
    totalStock: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Number,
      default: true,
    },
    quantity: {
      type:Number,
      default:1,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

productSchema.index(
  { name: 1, category: 1, price: 1, ratingsAverage: -1 },
  { unique: true }
);

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});
module.exports = mongoose.model("Product", productSchema);
