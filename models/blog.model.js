const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userName: String,
    content: String
  });
const blogSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId,ref:"user",required:true},
    userName:{type:String},
    title:{type:String,required:true},
    content:{type:String,required:true},
    category:{type:String,required:true},
    date:{type:Date},
    likes:{type:Array,default:[]},
    comments:[commentSchema],
    
})


const BlogModel = mongoose.model('blog',blogSchema)
module.exports = {BlogModel}


