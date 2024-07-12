
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId:{type: String, required: true},
    orderId:{type:String, required:true},
    products:{type:Object,required:true},
    address:{type: Object, required: true},
    amount:{type:Number, required: true},
    status:{type: String, default: 'Initiated', required: true},
  },{timestamps: true});

  mongoose.models = {}

//   export default mongoose.model("Order",OrderSchema)
  module.exports = mongoose.models.Orders || mongoose.model('Orders', OrderSchema)