const app = require('./app');
const connectDB = require('./config/database');
// const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

// Handling uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log('Server shutting down due to uncaught exception');
    process.exit(1);
})

// Setting up dotenv
// if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').dotenv.config({ path: 'backend/config/config.env' })
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

// Connecting to database
connectDB();

// Cloudinary configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Handle unhandled promise rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1)
    })
})


// // process.on('unhandledRejection', err => {
// //     try {
// //         console.log(err.name);
// //         console.log(err.message);
// //         console.log('Uncaught rejection --> shutting down')
// //         server.close(() => {
// //             process.exit(1)
// //         })
// //     } catch (err) {
// //         server.close(() => {
// //             process.exit(1)
// //         })
// //     }
// // });

// process.on('unhandledRejection', err => {
//     console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//     console.log(err.name, err.message);
//     server.close(() => {
//         process.exit(1);
//     });
// });

// process.on('SIGTERM', () => {
//     console.log('SIGTERM RECEIVED. Shutting down gracefully!');
//     server.close(() => {
//         console.log('Process terminated.')
//     });
// });