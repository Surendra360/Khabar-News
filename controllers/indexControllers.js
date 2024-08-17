const userModel = require("../models/userSchema")
const blogModel = require("../models/blogSchema");
const { model } = require("mongoose");

exports.index = async function (req, res, next) {
  const allBlogs = await blogModel.find();
  // console.log(allBlogs);
    res.render("index", {allBlogs, user:req.user});
  }

  exports.register = (req, res, next) => {
    res.render("register", {user:req.user, file:req.file});
  }

  exports.login =  (req, res, next) => {
    res.render("login", {user:req.user});
  }

  exports.blogReadMore = async (req,res,next)=>{
    const allusers = await userModel.find()
    const blogs = await blogModel.find().populate("createdBy")
    const blogData = await blogModel.findById(req.params.id).populate({
      path: "comments",
      model: "comment",
      populate:{path:"postedBy", model:'user'}
    }).exec()
    // console.log(blogData);
    res.render("blogReadMore", {allusers:req.user, blogs, blogData, user:req.user})
  }

  exports.deleteBlog = async(req,res,next)=>{
    await blogModel.findByIdAndDelete(req.params.id)
    res.redirect("/users/profile")
  }

  exports.updateBlogs = async(req,res,next)=>{
    const currentBlog = await blogModel.findById(req.params.id)
    res.render("updateBlogs",{currentBlog, user:req.user})
  }

  exports.about = (req,res,next)=>{
    res.render("about", {user:req.user})
  }
  exports.contact = (req,res,next)=>{
    res.render("contact", {user:req.user})
  }