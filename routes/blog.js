const { auth } = require("../middlewares/auth");
const { BlogModel } = require("../models/blog.model");
const blogRouter = require("express").Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;

blogRouter.get("/",async(req,res)=>{
    try {
        let sort =1;
        let filter ={}
        if(req.query.category){filter.category=req.query.category}
        if(req.query.title){filter.title={$regex:req.query.title}}
        if(req.query.sort && req.query.order){if(req.query.order=="desc"){sort=-1}else{sort=1}}
        


        let data = await BlogModel.find(filter).sort({date:sort});
        res.send(data)
    } catch (error) {
        console.log(error)
    }
});

blogRouter.post("/",auth,validatePost,async(req,res)=>{
    try {
    let newBlog = new BlogModel(req.body);
    let out = await newBlog.save();
    res.send({message:"New blog created successfully",data:out});

    } catch (error) {
        console.log(error)
    }
});


blogRouter.patch("/:id",auth,async(req,res)=>{
    try {
    
    let postInfo = await BlogModel.findById(req.params.id);
    if(req.body.userName != postInfo.userName){
        res.status(401).json({message:"you are not authorized"})}
    else {
      let out = await BlogModel.findByIdAndUpdate(req.params.id,req.body);
      res.send({message:`blog with title ${postInfo.title} updated successfully`,data:out});
    }

    } catch (error) {
        console.log(error)
    }
});
blogRouter.delete("/:id",auth,async(req,res)=>{
    try {
    let postInfo = await BlogModel.findById(req.params.id);
    if(req.body.userName !== postInfo.userName){
        res.status(401).json({message:"you are not authorized"})}
    else {
      let out = await BlogModel.findByIdAndDelete(req.params.id);
      res.send({message:`blog with title ${postInfo.title} deleted successfully`,data:out});
    }

    } catch (error) {
        console.log(error)
    }
});





//like 
blogRouter.patch("/:id/like",auth,async(req,res)=>{
    try {
    
    let postInfo = await BlogModel.findById(req.params.id);
    let likes = postInfo.likes;
    res.send(likes)
    

    } catch (error) {
        console.log(error)
    }
});














function validatePost(req,res,next){
    if(!req.body.userName){res.status(401).json({message:"please add user name"})}
    else if(!req.body.content){res.status(401).json({message:"please add content to this post"})}
    else if(!req.body.category){res.status(401).json({message:"please select a category to this post"})}
    else if(!req.body.title){res.status(401).json({message:"please select a title to this post"})}
    else{
        next();
    }

}



module.exports={blogRouter}