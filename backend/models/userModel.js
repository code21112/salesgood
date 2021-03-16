const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please, enter your name.'],
        trim: true,
        maxLength: [100, "Your name can't exceed 100 characters."]
    },
    firstName: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Please, enter your email address."],
        unique: true,
        validate: [validator.isEmail, 'Please, check your email address.']
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Your password must be at least 6 characters long."],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypting password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Comparing user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Generating JSON web token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

// Generating reset password token
userSchema.methods.getResetPasswordToken = function () {
    // Generating resetToken
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Encrypting the resetToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Setting up token expiration time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('User', userSchema);