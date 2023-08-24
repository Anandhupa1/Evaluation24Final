const express = require("express");
const { connect } = require("mongoose");
require("dotenv").config();
const app = express();





app.get("/",async(req,res)=>{
    try {
        res.send(process.env.mongoUrl)
    } catch (error) {
        
    }
})







app.listen(4000,async()=>{
    try {
        console.log("server started at http://localhost:4000")
        await connect;
        console.log("connected to remote database")
    } catch (error) {
        console.log(error)
    }
})