import User from "../../models/User"
import connectDb from "../../middeware/mongoose"
var CryptoJS = require("crypto-js");

const handler = async (req, res) =>{
    console.log(req.body)
    if(req.method == 'POST'){
      let user = new User({
        name:req.body.name,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
      })
      await user.save()
        res.status(200).json({success:"success"})
    }
    else{
        res.status(400).json({error:"error"})

    }
  }
  
  export default connectDb(handler);