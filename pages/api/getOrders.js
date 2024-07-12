import Order from "../../models/order"
import connectDb from "../../middeware/mongoose"

const handler = async (req, res) =>{
   const {USER_EMAIL,ALL} = req.body
   if(ALL){
    let ORDERS = await Order.find()
    res.status(200).json({ORDERS})
   }
    let ORDERS = await Order.find({userId:USER_EMAIL})
    res.status(200).json({ORDERS})
  }
  
  export default connectDb(handler);