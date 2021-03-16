const Product = require('./../models/productModel');
const dotenv = require('dotenv');
const connectDB = require('./../config/database');

const products = require('./../data/products.json');

// Setting up dotenv
dotenv.config({ path: 'backend/config/config.env' })

// Connecting to database
connectDB();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Products deleted OK');
        await Product.insertMany(products);
        console.log('Products inserted OK');
        process.exit();
    } catch (error) {
        console.log(error.message)
        process.exit();
    }
}

seedProducts();