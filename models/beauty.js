// 1.4.2 Require the Mongoose package
const mongoose = require('mongoose');

// 1.4.2 Create a schema to define the properties of the beauties collection
const beautySchema = new mongoose.Schema({
    photo: { type: String, required: true },
    brandName: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    qty: { type: Number, min: 0, required: true },
    size: { type: String, required: true },
    rating: { type: Number, min: 0, required: true },
    description: { type: String, required: true }
});

// 1.4.2 Export the schema as a Monogoose model. 
// 1.4.2 The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Beauty', beautySchema);
