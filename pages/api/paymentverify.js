/* eslint-disable react-hooks/rules-of-hooks */
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
import { useRouter } from "next/router";
import crypto from "crypto";
import Payment from "../../models/payment"
import Order from "../../models/order"
import Products from "../../models/product"
import connectDb from "../../middeware/mongoose"


const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_APT_SECRET,
  });

  const handler = async (req, res) =>{
  
  const c = await req.body;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderCart } = JSON.parse(c)
   const body = razorpay_order_id + "|" + razorpay_payment_id;
// console.log("id==",body)

 const expectedSignature = crypto
   .createHmac("sha256", process.env.NEXT_PUBLIC_RAZORPAY_APT_SECRET)
   .update(body.toString())
   .digest("hex");

const isAuthentic = expectedSignature === razorpay_signature;


 if (isAuthentic) {

  // console.log(Payment)

 

   let payment = new Payment({
    razorpay_order_id:razorpay_order_id,
    razorpay_payment_id:razorpay_payment_id,
    razorpay_signature:razorpay_signature,
    products:orderCart
   });
   await payment.save()
   
   //Update the available quantity of the particular product..
   const keys = Object.keys(orderCart)

  for(let i = 0;i<keys.length;i++){
      let prod = await Products.findOne({slug:keys[i]})
      let p = await JSON.parse(JSON.stringify(prod))
      console.log(p)
      console.log(p.quantity,'            ',orderCart[keys[i]].qty)
      await Products.findOneAndUpdate({slug:keys[i]},{quantity:p.quantity - orderCart[keys[i]].qty})
     

                
      
  }

   await Order.findOneAndUpdate({ orderId:razorpay_order_id},{status:"Paid"}) 
  //  await Order.findOneAndUpdate({ orderId:razorpay_order_id},{status:"Paid"})
       

} else {
    await Order.findOneAndUpdate({ orderId:razorpay_order_id},{status:"Failed"}) 

    res.json({
        message: "fail"
      }, {
        status: 400,
      })

}


res.json({
    message: "success",
    razorpay_order_id:razorpay_order_id
  }, {
    status: 200,
  })

}

export default connectDb(handler);