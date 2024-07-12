import product from "../../models/product"
import connectDb from "../../middeware/mongoose"

const handler = async (req, res) => {
  const { ALL, Seller } = req.body;
  if (ALL) {
    let products = await product.find({ seller: Seller })
    res.status(200).json({ products })
  }
  let products = await product.find({ category: "Animal" })
  res.status(200).json({ products })
}

export default connectDb(handler);