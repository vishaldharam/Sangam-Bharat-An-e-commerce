import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
import connectDb from "../../middeware/mongoose"
import Order from "../../models/order"


const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_APT_SECRET,
});




const handler = async (req, res) => {

    if (req.method == 'POST') {
        // console.log(req.body.cart,"              ",req.body.finalTotal)
        const payment_capture = 1;
        const amount = parseInt(req.body.finalTotal) * 100 // amount in paisa. In our case it's INR 1
        const currency = "INR";
        const options = {
            amount: (amount).toString(),
            currency,
            receipt: shortid.generate(),
            payment_capture,
            notes: {
                paymentFor: "testingDemo",
                userId: req.body.id,
                productId: 'P100'
            }
        };

        const order = await instance.orders.create(options);
        let o = new Order({
            userId:req.body.id,
            orderId:order.id,
            products:req.body.cart,
            address:req.body.finalAddress,
            amount:req.body.finalTotal,
            status:'Pending',
        });
        
        await o.save();
        res.json({ msg: "success", order, orderCart: req.body.cart });
    }
    else {
        res.status(400).json({ error: "error" })
    }
}

export default connectDb(handler);


export async function POST(req, res) {
    const body = await req.json();


    res.json({ msg: body });
}