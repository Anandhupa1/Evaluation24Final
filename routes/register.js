const { UserModel } = require("../models/user.model");

const registerRouter= require("express").Router();


registerRouter.post("/",validateUser,async(req,res)=>{
    try {
        let userExists = await UserModel.findOne({email:req.body.email});
        if(!userExists){
        let newUser = new UserModel(req.body);
        let out = await newUser.save();
        res.send({message:"Registration successfull, please login  "})
        }else {
        res.status(409).json({message:"user allready exists with this email"})
        }

    } catch (error) {
        console.log(error)
    }
})

function validateUser(req,res,next){
    if(!req.body.email){res.status(401).json({message:"please provide email"})}
    else if(!req.body.password){res.status(401).json({message:"please provide password"})}
    else if(!req.body.cPassword){res.status(401).json({message:"please confirm your password"})}
    else if(req.body.cPassword!== req.body.cPassword){res.status(401).json({message:"Password and confirm password not matching"})}
    else {
        next()
    }
}

module.exports={registerRouter}