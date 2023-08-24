const express = require("express");
const { connect } = require("./config/connection");
require("dotenv").config();
const cors  = require("cors");
const { loginRouter } = require("./routes/login");
const { registerRouter } = require("./routes/register");
const { auth } = require("./middlewares/auth");
const { UserModel } = require("./models/user.model");
const { blogRouter } = require("./routes/blog");
const app = express();
app.use(express.json());
app.use(cors());




app.get("/" ,async(req,res)=>{
    try {
        res.send("Evaluation 24-08-2023 | Blog App");
    } catch (error) {
        
    }
})
app.get("/user" ,auth,async(req,res)=>{
    try {
        let data = await UserModel.findById(req.body.userId);
        res.send(data)
    } catch (error) {
        
    }
})


app.use("/api/login",loginRouter);
app.use("/api/register",registerRouter);
app.use("/api/blog",blogRouter);






app.listen(4000,async()=>{
    try {
        console.log("server started at http://localhost:4000")
        await connect;
        console.log("connected to remote database")
    } catch (error) {
        console.log(error)
    }
})