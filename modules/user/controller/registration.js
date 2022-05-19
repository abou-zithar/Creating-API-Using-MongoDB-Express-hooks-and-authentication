const userModel = require("../../../DB/model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const signup = async (req, res) => {

    const { name, email, password, cPassword ,phone,age} = req.body;

    if (password === cPassword) {

        const findUser = await userModel.findOne({ email }).select('-_id email')
        console.log(findUser);
        if (findUser) {
            res.json({ message: 'email exist' })
        } else {
           
            const hashPasssword = await bcrypt.hash(password, process.env.saltRound)
            let savedUser = await userModel.insertMany({ name, email, password: hashPasssword,phone,age });
            res.json({ message: "Done", savedUser })
        }
    } else {
        res.json({ message: "password misMatch cPassword" })
    }

}
const signin = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
        const match = await bcrypt.compare(password, user.password)
        console.log(match);
        if (match) {
            const token = jwt.sign({id:user.id , isLoggedIn : true} ,process.env.JWTKEy , { expiresIn :60})
            res.json({ message: "Done", token })
        } else {
            res.json({ message: "in-valid password" })

        }
    } else {
        res.json({ message: "email or password misMatch" })
    }


}
module.exports = {
    signup,
    signin
}