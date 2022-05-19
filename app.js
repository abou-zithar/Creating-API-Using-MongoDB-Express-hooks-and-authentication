const express  = require('express');
const connectDB = require('./DB/connection');
const { userRouter, blogRouter } = require('./modules/index.router');
require('dotenv').config()


const app = express()
const port = process.env.Port
app.use(express.json())
app.use(userRouter , blogRouter)
connectDB()
app.listen(port , ()=>{
    console.log("running......");
})