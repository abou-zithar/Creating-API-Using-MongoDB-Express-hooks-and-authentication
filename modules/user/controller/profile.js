const userModel = require("../../../DB/model/user");



const updateUser = async (req, res) => {


    const { id } = req.params;
    const { name, phone } = req.body;

    
    const updatedUser = await userModel.findOneAndUpdate({ _id: id }, { name, phone }, { new: true }).select('-password')
    console.log(updatedUser);
    if (updatedUser) {
        res.json({ message: 'Done', updatedUser })
    } else {
        res.json({ message: 'in-valid id' })
    }
}



const allUsers = async (req, res) => {
    const userList = await userModel.find({}).select('-password');
    res.json({ message: "Done", userList })
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    
    const deletedUser = await userModel.deleteOne({ _id: id }, { new: true }).select("-password")
    res.json({ message: 'Done', deletedUser })
}


const profileData = async (req, res) => {
    console.log(req.user);
    const  id  = req.user._id;
    const user = await  userModel.findById(id).select('-passsword');
    res.json({message:"Done", user})
}

const changepassword = async (req, res) => {


    const { id } = req.params;
    const { password } = req.body;

    
    const changepassword = await userModel.findOneAndUpdate({ _id: id }, { password }, { new: true }).select('-password')
    console.log(changepassword);
    if (changepassword) {
        res.json({ message: 'Done', changepassword })
    } else {
        res.json({ message: 'in-valid id' })
    }
}

module.exports = {
    updateUser,
    allUsers,
    deleteUser,
    profileData,
    changepassword
}