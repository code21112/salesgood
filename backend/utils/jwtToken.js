// Create token, send and save it in the cookie
const sendToken = (user, statusCode, res) => {

    // Creating Jwt token
    const token = user.getJwtToken();

    // Options for the cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    })

}

module.exports = sendToken;
