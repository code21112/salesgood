const mongoose = require('mongoose');

const connectDB = () => {
    // mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DB_URI_PROD, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`DB connected with HOST: ${con.connection.host}`)
    })
    // .catch(err => console.log(err))
};

module.exports = connectDB;


