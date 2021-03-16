const express = require('express');
const router = express.Router();

const { processPayment, sendStripeApi } = require('./../controllers/paymentController');
const { isAuthenticatedUser, authorizedRoles } = require('./../middlewares/authMiddleware');

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripeApi);

module.exports = router;