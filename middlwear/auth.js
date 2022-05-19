const jwt = require("jsonwebtoken");
const userModel = require("../DB/model/user");
require('dotenv').config()


const auth = () => {


    return async (req, res, next) => {

        const headerToken = req.headers['authorization'];
        try {
            if (headerToken == null || headerToken == undefined || !headerToken.startsWith('Bearer ')) {
                res.json({ message: "in-valid header token" })
            } else {
                const token = headerToken.split(" ")[1];
                if (!token || token == undefined || token.length < 1) {
                    res.json({ message: "in-valid token" })
                } else {

                    const decoded = jwt.verify(token, process.env.JWTKEy);
                    const findUser = await userModel.findById(decoded.id).select('id name email');
                    if (!findUser) {
                        res.json({ message: "in-valid token user" })
                    } else {
                        req.user = findUser;
                        next()
                    }

                }

            }
        } catch (error) {
            res.json({ message: "catch error", error })

        }

    }
}


module.exports = {
    auth
}