const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, allUsers, getUserDetails, updateUserProfile, deleteUser } = require('./../controllers/authController');
const { isAuthenticatedUser, authorizedRoles } = require('./../middlewares/authMiddleware');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

router.route('/admin/users').get(isAuthenticatedUser, authorizedRoles('admin'), allUsers);
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizedRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizedRoles('admin'), updateUserProfile)
    .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteUser);

module.exports = router;
