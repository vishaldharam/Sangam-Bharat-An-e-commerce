import user from "../../models/User"
import connectDb from "../../middeware/mongoose"
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {

    if (req.method == 'POST') {
        const USER_EMAIL = req.body.EMAIL
        const RES = await fetch("http://localhost:3000/api/getuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ USER_EMAIL }),
        });
        let USER_DATA = await RES.json()
        const PASSWORD = USER_DATA.USER['password']
        const decrypted = CryptoJS.AES.decrypt(PASSWORD,  process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
        console.log(decrypted,'      ',req.body.CUPASSWORD)
        if(decrypted === req.body.CUPASSWORD) {

            res.status(200).json({ message:true })
        }
        else{
            res.status(200).json({ message:false })
        }
    }
    else {
        res.status(500).json({ error: "error" })

    }
}

export default connectDb(handler);