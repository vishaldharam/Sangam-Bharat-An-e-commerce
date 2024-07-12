import Products from "../../models/product"
import connectDb from "../../middeware/mongoose"


const handler = async (req, res) => {
    const { cartItems,finalTotal} = req.body
    if (req.method == 'POST') {
        let sumTotal = 0;
        const keys = Object.keys(cartItems)
        // console.log(keys.length)
        for(let i = 0;i<keys.length;i++){
            
            let product = await Products.findOne({slug:keys[i]})
            let data = product
            // console.log(data)
      
            if(cartItems[keys[i]].price !== product.price){
                res.json({status:true})
            }           
            // sumTotal += cartItems[keys[i]].price * cartItems[keys[i]].qty 
        }
        
        

    }
    res.json({status:false})
}

export default connectDb(handler);