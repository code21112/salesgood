const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

// Checking if the user is authenticated
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies
    // console.log('token from authMiddleware.js', token)
    if (!token) {
        return next(new ErrorHandler('Log in first to access this resource', 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id);
    next();
});

// Handling user roles
exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        // console.log('req.user.role within authorizedRoles middleware', req.user.role)
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) cannot access this resource`, 403))
        }
        next()
    }
}
