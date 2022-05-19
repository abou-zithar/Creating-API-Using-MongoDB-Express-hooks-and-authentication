const mongoose =  require('mongoose');
require('dotenv').config()


const connectDB =  ()=>{
    return  mongoose.connect(process.env.connection_String).then((result)=>{
        console.log("connected........" );
    }).catch(err=> console.log('fail to connect DB....' , err))
}

module.exports = connectDB