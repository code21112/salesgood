const User = require('./../models/userModel');
const ErrorHandler = require('./../utils/errorHandler');
const catchAsyncErrors = require('./../middlewares/catchAsyncErrors');
const sendToken = require('./../utils/jwtToken');
const sendEmail = require('./../utils/sendEmail');

const cloudinary = require('cloudinary');
const crypto = require('crypto');

const { capitalize } = require('./../utils/capitalize');


// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    // console.log('req.body.avatarPreview', req.body.avatarPreview)

    if (!req.body.avatar) {
        return next(new ErrorHandler('You must choose an avatar', 400));
    }
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'Avatars',
        width: 150,
        crop: 'scale'
    })

    const { name, email, password } = req.body;

    const firstName = req.body.name.trim().split(' ')[0];
    const firstNameCapitalized = capitalize(firstName);

    const user = await User.create({
        name,
        firstName: firstNameCapitalized,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })
    sendToken(user, 201, res)
});




// Login user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checking if email and password are present
    if (!email || !password) {
        return next(new ErrorHandler('Please, enter your email and your password', 400));
    }
    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler("Please check your email and password. If you need to reset your password, please use the link.", 401))
    }

    // Checking password
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Please check your email and password. If you need to reset your password, please use the link.", 401))
    }
    sendToken(user, 200, res)
});

// Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("We couldn't find an account with that email address.", 404));
    }
    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false })

    // Creating the reset password URL
    // const resetURL = `${req.protocol}://${req.get('host')}/api/v1/reset/${resetToken}`
    const resetURL = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
    // const resetURL = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

    // Preparing the message to send
    const message = `Your password reset token is as follow: \n\n${resetURL}\n\nIf you haven't requested this email, ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'SalesGood -- Password Recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
});

// Reset Password   =>  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hashing URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Your password and your confirm password do not match', 400))
    }

    // Setting up the new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})

// Current user profile => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
});

// Change / Update the password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    // Checking current user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Please check your password', 400))
    }
    // Saving the user with the new password
    user.password = req.body.newPassword;
    await user.save();

    // Sending a new token
    sendToken(user, 200, res)
});

// Update user's profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    // Updating firstName (as userName)
    const firstName = req.body.name.trim().split(' ')[0];
    const firstNameCapitalized = capitalize(firstName);

    newUserData.firstName = firstNameCapitalized;

    // Updating avatar
    // if (req.body.avatar !== '') {
    if (req.body.avatar) {

        const user = await User.findById(req.user.id)
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'Avatars',
            width: 150,
            crop: 'scale'
        })
        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }


    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
});


// Logout => /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
});

// ADMIN ROUTES //

// Get all users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        results: users.length,
        users
    })
});

// Get a specific user => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User not found with the id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    })
});

// Update a specific user's profile => /api/v1/admin/user/:id
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    // Updating avatar: TODO

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
});

// Delete a specific user => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User not found with the id: ${req.params.id}`))
    }
    // Removing avatar
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);

    await user.remove();
    res.status(200).json({
        success: true
    })
});

