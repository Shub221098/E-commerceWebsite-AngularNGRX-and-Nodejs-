const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name"],
    },
    email: {
      type: String,
      required: [true, "Please tell us your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: { type: String, default: "default.jpg" },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minlength: 8,
      select: false, // Hide this field when fetch data from database
      validate: {
        validator: function (e) {
          const exp =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
          const pwd = e.match(exp);
          const ans = JSON.parse(JSON.stringify(pwd.input).replaceAll(" ", ""));
          return ans;
        },
        message:
          "Minimum eight characters, at least one letter, one number and one special character and not allow space between character",
      },
    },

    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Wrong Password. Please try again",
      },
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
    },
    address:{
      type:String,
      required: [true, "Please tell us your address"]
    },
    state:{
      type:String,
      required: [true, "Please tell us your state"]
    },
    city:{
      type:String,
      required: [true, "Please tell us your city"]
    },
    postalCode:{
      type:Number,
      required: [true, "Please tell us your postalCode"]
    },
    phone:{
      type:Number,
      default: 9602650160
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("carts", {
  ref: "Cart",
  foreignField: "userId",
  localField: "_id",
});

// ******************************************* CHECK PASSWORD DURING LOGIN ***********************************************
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// ******************************************* GENERATE RESET TOKEN FOR RESET PASSWORD ************************************
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete Password confirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
