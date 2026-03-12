const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_PRIVACY_KEY, {
    expiresIn: `${process.env.JWT_EXPIRY_TIME}d`,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangeAt: req.body.passwordChangeAt,
  });
  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'Success',
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Please enter email and password', 400));

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  const token = signToken(user._id);

  res.status(201).json({
    status: 'Success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get Access.', 401),
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_PRIVACY_KEY,
  );

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exsist.',
        401,
      ),
    );
  }
  if (freshUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError('Your password has been changed! Please log in again.', 401),
    );
  }

  req.user = freshUser;
  next();
});

exports.restrict = (...roles) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
};
