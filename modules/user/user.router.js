const { auth } = require("../../middlwear/auth");
const { updateUser, allUsers, deleteUser, profileData, changepassword } = require("./controller/profile");
const { signup, signin } = require("./controller/registration");

const router = require("express").Router();



router.post('/signup' , signup )


router.post('/signin' , signin)

router.patch('/user/:id' , updateUser )
router.patch('/userpassword/:id' , changepassword )

router.get("/users", allUsers)
router.get("/user/profile", auth(), profileData)



router.delete("/user/:id" , deleteUser)

module.exports = router