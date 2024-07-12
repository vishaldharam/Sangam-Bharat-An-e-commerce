
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true  },
    title: { type: String, require: true},
    seller: { type: String, require: true},
    desc: { type: String, require: true },
    images: [{type: String, required: true}],
    category: { type: String, require: true },
    subCategory: { type: String, require: true },
    age: { type: String},
    color: { type: String},
    size: { type: String},
    price: { type: Number, required: true },
    quantity: { type: Number},
    date: { type: Date, default: Date.now }
},{timestamps: true});

mongoose.models = {}
export default mongoose.model("Product",ProductSchema)