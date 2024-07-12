import product from "../../models/product"
import connectDb from "../../middeware/mongoose"

const handler = async (req, res) =>{
    console.log(req.body)
    if(req.method == 'POST'){
        for(let i = 0;i<req.body.length;i++){
            let p = new product({
                slug:req.body[i].slug,
                title: req.body[i].title,
                seller: req.body[i].seller,
                desc: req.body[i].desc,
                images:req.body[i].images,
                category: req.body[i].category,
                subCategory: req.body[i].subCategory,
                age: req.body[i].age,
                color: req.body[i].color,
                size: req.body[i].size,
                price: req.body[i].price,
                quantity: req.body[i].quantity,
                
            })
            await p.save();

        }
        res.status(200).json({success:true})
    }
    else{
        res.status(400).json({success:false})

    }
  }
  
  export default connectDb(handler);