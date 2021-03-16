const express = require('express');
const router = express.Router();

const {
    getProducts,
    getMaxPrice,
    getAdminProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview
} = require('./../controllers/productController');

const { isAuthenticatedUser, authorizedRoles } = require('./../middlewares/authMiddleware');

router.route('/products').get(getProducts);
router.route('/products/maxprice').get(getMaxPrice);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/products').get(getAdminProducts);
// router.route('/admin/products').get(isAuthenticatedUser, authorizedRoles('admin'), getAdminProducts);
router.route('/admin/product/new').post(isAuthenticatedUser, authorizedRoles('admin'), newProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProduct);

router.route('/review/new').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router;