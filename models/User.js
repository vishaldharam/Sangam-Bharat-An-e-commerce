
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, require: true ,unique: true},
    password: { type: String, require: true },
    address: { type: String, default:'' },
    pincode: { type: String, default:'' },
    phone: { type: String, default:''},
  
},{timestamps: true});

mongoose.models = {}

export default mongoose.model("User", UserSchema)