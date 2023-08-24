const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const jwt = require('jsonwebtoken');

loginRouter.post("/",validateUser,async(req,res)=>{
    try {
        let userExists = await UserModel.findOne({email:req.body.email});
        if(userExists){
            const val = await bcrypt.compare(req.body.password,userExists.password);
        if(val){
// _____________________________________________
     const  token = jwt.sign({ userId: userExists._id }, 'masai');
     res.send({message:` you have logged in successfully`,token})
// _____________________________________________

        }
        else {res.status(422).json({message:"wrong password"})}
        
        }else {
        res.status(401).json({message:"no user data found, please register",token})
        }
    } catch (error) {
        console.log(error)
    }
})


function validateUser(req,res,next){
    if(!req.body.email){res.status(401).json({message:"please provide email"})}
    else if(!req.body.password){res.status(401).json({message:"please provide password"})}
    else {
        next()
    }
}

module.exports={loginRouter}