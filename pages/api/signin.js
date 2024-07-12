import User from "../../models/User"
import connectDb from "../../middeware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {

    if (req.method == 'POST') {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            console.log()
            let bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            let password = bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.password === password) {
                let token = jwt.sign({ email: user.email, name: user.name}, process.env.SECRET_KEY);
                res.status(200).json({ success: true,token:token})
            }
            else {
                res.status(400).json({ error: "Invalid Credentials" })

            }

        }
        else {
            res.status(400).json({ error: "Invalid Credentials" })

        }

    }
    else {
        res.status(400).json({ error: "error" })

    }
}

export default connectDb(handler);