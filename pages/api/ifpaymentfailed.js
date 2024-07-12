import Order from "../../models/order"
import connectDb from "../../middeware/mongoose"


const handler = async (req, res) => {
    const { orderID,id} = JSON.parse(req.body)
    if (req.method == 'POST') {
        await Order.findOneAndUpdate({orderId:orderID},{status:'Failed'})
        // console.log(orderID)
        // console.log(id)

    }
    res.json({message:"success"})
}

export default connectDb(handler);