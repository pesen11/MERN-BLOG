const TagService = require("../Services/tagService");
const Tag = require("../Models/tagModel");
const { update } = require("../Models/userModel");

class TagController {
  constructor() {
    this.tagSrvcObject = new TagService();
  }
  addTag = async (req, res, next) => {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    try {
      let tagValidationError = this.tagSrvcObject.validateTag(data);
      let existingTag = await Tag.findOne({ title: data.title });
      if (existingTag) {
        next({
          status: 400,
          msg: "Tag already exists.",
        });
        return;
      }
      if (data.followers) {
        data.followers = data.followers.split(",");
      }
      if (data.blogs) {
        data.blogs = data.blogs.split(",");
      }

      data.slug = this.tagSrvcObject.getTagSlug(data.title);

      let tag = new Tag(data);
      let ack = await tag.save();

      if (ack) {
        res.json({
          result: tag,
          msg: "Tag created succesfully",
          status: true,
        });
      } else {
        next({
          status: 500,
          msg: err,
        });
      }
    } catch (err) {
      next({
        status: 400,
        msg: err,
      });
    }
  };

  getAllTags = async (req, res, next) => {
    try {
      let filter = {};
      if (req.query.featured) {
        filter = {
          featured: true,
        };
      }

      let tags = await Tag.find(filter).populate("followers"); //.populate('blogs') after blog model
      res.json({
        result: tags,
        msg: "Tags fetched succesfully",
        status: true,
      });
    } catch (err) {
      next({
        status: 500,
        msg: err,
      });
    }
  };

  getTagById = async (req, res, next) => {
    try {
      let tag = await Tag.findById(req.params.id).populate("followers"); //.populate('blogs')

      if (tag) {
        res.json({
          result: tag,
          msg: "Tag fetched succesfully",
          status: true,
        });
      } else {
        next({
          status: 400,
          msg: "Tag does not exist",
        });
      }
    } catch (err) {
      next(err);
    }
  };

  updateTag = async (req, res, next) => {
    let data = req.body;
    if (req.file) {
      data.image = req.file.filename;
    }
    try {
      let tagValidationError = this.tagSrvcObject.validateTag(data);
      let existingTag = await Tag.findOne({ title: data.title });
      if (existingTag) {
        next({
          status: 400,
          msg: "Tag already exists.",
        });
        return;
      }
      if (data.followers) {
        data.followers = data.followers.split(",");
      }
      if (data.posts) {
        data.posts = data.posts.split(",");
      }

      let updatedTag = await Tag.findByIdAndUpdate(req.params.id, { $set: data }, { new: true });

      if (updatedTag) {
        res.json({
          result: updatedTag,
          msg: "Tag created succesfully",
          status: true,
        });
      } else {
        next({
          status: 500,
          msg: err,
        });
      }
    } catch (err) {
      next({
        status: 400,
        msg: err,
      });
    }
  };

  deleteTagById = async (req, res, next) => {
    try {
      let result = await Tag.findByIdAndDelete(req.params.id);
      if (result) {
        res.json({
          result: result,
          msg: "Tag deleted succesfully",
          status: true,
        });
      } else {
        next({
          status: 400,
          msg: "Tag not found.",
        });
      }
    } catch (err) {
      next({
        status: 400,
        msg: err,
      });
    }
  };
}

module.exports = TagController;
