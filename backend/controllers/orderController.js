const Order = require('./../models/orderModel');
const Product = require('./../models/productModel');
const ErrorHandler = require('./../utils/errorHandler');
const catchAsyncErrors = require('./../middlewares/catchAsyncErrors');

// Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(200).json({
        success: true,
        order
    })
});

// Get a single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (!order) {
        return next(new ErrorHandler('No order found with this id', 404))
    }
    res.status(200).json({
        success: true,
        order
    })
});

// Get logged in user's orders => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
});


// ADMIN ROUTES //

// Get all orders => /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })
    // totalAmount = totalAmount.toFixed(2)

    res.status(200).json({
        success: true,
        results: orders.length,
        totalAmount,
        orders
    })
});

// Update/Process order => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('This order has already been delivered', 400))
    }
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true,
        order
    })
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
}

// Delete a specific order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler(`Order not found with the id: ${req.params.id}`))
    }
    await order.remove();
    res.status(200).json({
        success: true
    })
});




