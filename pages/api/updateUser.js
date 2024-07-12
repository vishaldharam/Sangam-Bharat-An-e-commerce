import user from "../../models/User"
import connectDb from "../../middeware/mongoose"

const handler = async (req, res) =>{
   
   const {EMAIL,NAME,ADDRESS,PINCODE,PHONE} = req.body
   const USER_EMAIL = EMAIL
   const RES = await fetch("http://localhost:3000/api/getuser", {
       method: "POST",
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({ USER_EMAIL }),
   });
   let USER_DATA = await RES.json()
   const ADDRESS2 = USER_DATA.USER['password'] 
   if(req.method == 'POST'){
    await user.findOneAndUpdate({ "email": EMAIL }, { "$set": { "name": NAME, "email": EMAIL, "password": ADDRESS2, "address": ADDRESS, "phone": PHONE , "pincode": PINCODE}}) 
    res.status(200).json({message:"success"})
   }
   else{
    res.status(500).json({error:"error"})

   }
  }
  
  export default connectDb(handler);