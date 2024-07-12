import user from "../../models/User"
import connectDb from "../../middeware/mongoose"
import { userAgent } from "next/server";
var CryptoJS = require("crypto-js");

const handler = async (req, res) =>{
   
   const {EMAIL,PASSWORD} = req.body
   const ENCRYPT_PASSWORD = CryptoJS.AES.encrypt(PASSWORD, process.env.SECRET_KEY).toString()
  
   if(req.method == 'POST'){
    await user.findOneAndUpdate({ email:EMAIL},{password:ENCRYPT_PASSWORD}) 
    res.status(200).json({message:true})
   }
   else{
    res.status(500).json({error:"error"})

   }
  }
  
  export default connectDb(handler);