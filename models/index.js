// 1.4.1 Require the Mongoose package & your environment configuration
const mongoose = require('mongoose');
require('dotenv').config()

// 1.4.1 Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection

db.on('connected', function () {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

// 1.4.3 this will access the Pet model inside models/index.js
module.exports = {
    Beauty: require('./beauty'),
    // 1.6.2 export models and seed data to server.js
    seedBeauties: require('./seed')
}
