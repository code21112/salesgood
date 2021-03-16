const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter a product name.'],
        trim: true,
        maxLength: [100, 'A produt name must be less than 100 characters.']
    },
    price: {
        type: Number,
        required: [true, 'Enter a product price.'],
        maxLength: [5, 'A produt name must be less than 100 characters.'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Enter a product description.'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please, select a category for the product'],
        enum: {
            values: [
                'Percussion instruments',
                'Wind instruments',
                'Stringed instruments',
                'Electronic instruments',
                'Accessories',
                'Recording gear',
                'Headphones',
                'Virtual instruments'
            ],
            message: 'Please select a category for the product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please, provide the product seller.']
    },
    stock: {
        type: Number,
        required: [true, 'Please, enter the product stock'],
        maxLength: [5, "A product stock cannot exceed 10 000!"],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Product', productSchema);