const catchAsync = require("../catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../model/user.model");
const appError = require("../appError");
const sendVerificationEmail = require("../email");
const crypto = require("crypto");


// *************************************** GENERATE TOKEN ******************************************
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


// **************************************** SENDING RESPONSE ***************************************
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};


// ***************************************** SIGN UP USER *********************************************
exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(new appError("This email is already registered.", 400));
  }
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);
  newUser.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  newUser.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await newUser.save({ validateBeforeSave: false });
  const name = newUser.name
  const email = newUser.email
  const subject = "Verification Mail from Colafee"
  const action = "verify your account"
  const action2 = "Login"
  const method = 'verifyEmail'
  try {
    await sendVerificationEmail(name, email, subject, method, token, action, action2);
    res.status(200).json({
      status: "success",
      message:
        "You have registered successfully.Check your email to verify your account.",
    });
  } catch (err) {
    newUser.passwordResetToken = undefined;
    newUser.passwordResetExpires = undefined;
    await newUser.save({ validateBeforeSave: false });
    return next(
      new appError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

// ***************************************** VERIFY EMAIL *********************************************
exports.verifyEmail = catchAsync(async (req, res, next) => {
  // 1. Get user based on the token
  token = req.body.token;

  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // 2. If token has not expired, and there is a user , set a verifyUser
  if (!user) {
    return next(new appError("Token is invalid or has expired", 401));
  }
  user.active = true;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save({ validateBeforeSave: false });
  // 3. Update ChangePasswordAt property from the user
  // 4. Log the user in, send JWT
  // const queryParams = querystring.stringify({ user: JSON.stringify(user)});
  // return res.redirect(`http://localhost:4200/auth/verifyEmail?${queryParams}`);
  createSendToken(user, 200, res);
  // res.status(200).json({
  //   status: "success",
  //   token,
  //   user,
  // });
});

// ********************************************** LOGIN USER *****************************************
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1. Check if email and password exist
  if (!email || !password) {
    return next(new appError("Please provide email and password!", 400));
  }
  // 2. Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError("Incorrect Email or Password", 400));
  }
  if (!user.active) {
    return res.status(400).send({
      message: "Pending Account. Please Verify Your Email!",
    });
  }
  const token = signToken(user._id);
  // 3. If everything ok, send token to client
  res.status(200).json({
    status: "Login Successfully",
    token,
    user,
  });
});

// ***************************************** FORGOT PASSWORD *****************************************
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. Get User based on Posted Email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new appError("This email does not exist", 400));
  }
  // 2. Generate the random reset token
  const newToken = user.createPasswordResetToken();
  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(newToken)
    .digest("hex");
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });
  // 3. Send it to user's email
  const name = user.name
  const email = user.email
  const action = "reset your password"
  const subject = "Reset Password Mail from Colafee"
  const action2 = "Change Password"
  const method = 'resetPassword'
  try {
    await sendVerificationEmail(name, email, subject,method, newToken, action, action2)
    res.status(200).json({
      status: "success",
      message: "Reset Password Link send to registered email.Click the link and Enter new Password!",
    });
  } catch (err) {
    return next(
      new appError(
        "There was an error sending the email. Try again later!",
        401
      )
    );
  }
});

// **************************************** RESET PASSWORD ********************************************
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  console.log(user);
  // 2. If token has not expired, and there is a user , set a new password
  if (!user) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    return next(new appError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.password;
  await user.save();
  // 3. Update ChangePasswordAt property from the user
  // 4. Log the user in, send JWT
  createSendToken(user, 200, res);
});

// ***************************************** UPDATE PASSWORD *******************************************

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get User from collection
  const user = await User.findById(req.user.id).select("+password");
  console.log(user, user.password);
  // 2. Checked if posted current password is correct
  if (req.body.password !== req.body.passwordConfirm) {
    return next(
      new appError(
        "Your password and confirm password does'nt match",
        400
      )
    );
  }
  console.log("true");
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new appError("Your current password is wrong", 400));
  }
  // 3. If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // 4. Log user in, send JWT
  createSendToken(user, 200, res);
});

// *********************************************AUTHERIZATION ROUTE****************************************
exports.protect = catchAsync(async (req, res, next) => {
  console.log("Update");
  // 1. Getting token and check of it's there
  let token;
  console.log("hello", req.headers.authorization);
  console.log("hello", req.query);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new appError("You are not logged in. Please login to get access", 401)
    );
  }
  // 2. Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  //3. Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new appError("The user belonging to this token does not exist.", 401)
    );
  }
  req.user = currentUser;
  next();
});


// *************************************** ROLE MANAGE ************************************************
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new appError("You do not have permission to perform this action", 400)
      );
    }
    next();
  };
};
