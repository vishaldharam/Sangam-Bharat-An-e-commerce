import Products from "../../models/product"
import connectDb from "../../middeware/mongoose"


const handler = async (req, res) => {
    const { cartItems} = req.body
    if (req.method == 'POST') {
        const keys = Object.keys(cartItems)
         console.log(keys.length)
        for(let i = 0;i<keys.length;i++){
            
            let product = await Products.findOne({slug:keys[i]})
           
      
            if(cartItems[keys[i]].qty > product.quantity){
                res.json({status:true})
            }           
            
        }
        
        

    }
    res.json({status:false})
}

export default connectDb(handler);