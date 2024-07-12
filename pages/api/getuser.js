import user from "../../models/User"
import connectDb from "../../middeware/mongoose"

const handler = async (req, res) =>{

   if(req.method == 'POST'){
    let USER = await user.findOne({email:req.body.USER_EMAIL})
    res.status(200).json({USER})
   }
   else{
    res.status(500).json({error:"error"})

   }
  }
  
  export default connectDb(handler);