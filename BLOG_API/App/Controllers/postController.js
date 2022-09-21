const Post = require("../Models/postModel");
const PostService = require("../Services/postService");
const PostStar = require("../Models/postStarModel");
const User = require("../Models/userModel");

class PostController {
  constructor() {
    this.postSrvcObj = new PostService();
    this.date = new Date();
    this.month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }
  addPost = async (req, res, next) => {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    try {
      data.date = `${
        this.month[this.date.getMonth()]
      } ${this.date.getDay()}, ${this.date.getFullYear()}`;
      let postValidationError = this.postSrvcObj.validatePost(data);
      let existingPost = await Post.findOne({ title: data.title });
      if (existingPost) {
        next({
          status: 400,
          msg: "Post already exists.",
        });
        return;
      }

      if (data.stars) {
        data.stars = data.stars.split(",");
      } else {
        data.stars = [];
      }
      if (data.comments) {
        data.comments = data.comments.split(",");
      } else {
        data.comments = [];
      }
      let currentUser = req.authUser;

      data.slug = this.postSrvcObj.getPostSlug(data.title);
      data.author = currentUser._id;
      data.authorName = currentUser.name;

      let post = new Post(data);

      let ack = await post.save();

      await User.updateOne({ _id: currentUser._id }, { $push: { posts: post._id } }); //Update post field for author

      if (ack) {
        res.json({
          result: post,
          msg: "Post created succesfully.",
          status: true,
        });
      } else {
        next({
          status: 500,
          msg: "Cannot create post",
        });
      }
    } catch (err) {
      next({
        status: 400,
        msg: err,
      });
    }
  };

  getAllPosts = async (req, res, next) => {
    try {
      let filter = {};

      if (req.query) {
        filter = req.query;
      }
      // console.log(filter);

      let posts = await Post.find(filter).populate("author").populate("stars"); //.populate('blogs') after blog model
      res.json({
        result: posts,
        msg: "Posts fetched succesfully",
        status: true,
      });
    } catch (err) {
      next({
        status: 500,
        msg: err,
      });
    }
  };

  getPostbyId = async (req, res, next) => {
    try {
      let post = await Post.findById(req.params.id).populate("author").populate("stars");
      if (post) {
        res.json({
          result: post,
          msg: "Post fetched succesfully",
          status: true,
        });
      } else {
        next({
          msg: "Post does not exists",
          status: 400,
        });
      }
    } catch (err) {
      next({
        status: 400,
        msg: err,
      });
    }
  };

  deletePostById = async (req, res, next) => {
    try {
      let result = await Post.findByIdAndDelete(req.params.id);
      let currentUser = req.authUser;
      await User.updateOne({ _id: currentUser._id }, { $pull: { posts: req.params.id } });
      if (result) {
        res.json({
          result: result,
          msg: "Post deleted succesfully",
          status: true,
        });
      } else {
        next({
          status: 400,
          msg: "Post not found.",
        });
      }
    } catch (err) {
      next({
        status: 500,
        msg: err,
      });
    }
  };

  updatePost = async (req, res, next) => {
    let data = req.body;

    if (req.file) {
      data.image = req.file.filename;
    }

    try {
      let postValidationError = this.postSrvcObj.validatePost(data, true);

      let updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: data }, { new: true });

      if (updatedPost) {
        res.json({
          result: updatedPost,
          msg: "Post updated succesfully",
          status: true,
        });
      } else {
        next({
          status: 500,
          msg: "Could not update the post",
        });
      }
    } catch (err) {
      console.log(err);

      next({
        status: 400,
        msg: err,
      });
    }
  };

  toggleStars = async (req, res, next) => {
    try {
      let user = req.authUser;
      let post = await Post.findById(req.params.id);

      if (post) {
        let currentUser = user;

        let starredPost = await PostStar.findOne({ postId: post._id, userId: currentUser._id }); //is the post starrerd.
        //if the post has not been starred by the current user then create a new post star and add it to the post
        //If already been starred then remove the star.
        if (!starredPost) {
          let newStar = new PostStar({ postId: post._id, userId: currentUser._id });
          let ack = await newStar.save();
          await Post.updateOne({ _id: req.params.id }, { $push: { stars: ack._id } }); //update the post by adding the recently created star.
          let updatedPost = await Post.findById(req.params.id);
          return res.json({
            result: updatedPost,
            status: true,
            msg: "Succesfully added star.",
          });
        } else {
          await PostStar.deleteOne({ _id: starredPost._id });
          await Post.updateOne({ _id: req.params.id }, { $pull: { stars: starredPost._id } });
          let updatedPost = await Post.findById(req.params.id);
          return res.json({
            result: updatedPost,
            msg: "Succesfully removed star",
            status: true,
          });
        }
      } else {
        next({
          status: 400,
          msg: "Post not found.",
        });
      }
    } catch (err) {
      next({
        status: 400,
        msg: err,
      });
    }
  };

  // uploadImage=async(req,res,next)=>{
  //   let data=req.body
  //   try{
  //     if(req.file){
  //       data.image=req.file.filename
  //     }
  //   }
  // }
}

module.exports = PostController;
