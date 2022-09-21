const slugify = require("slugify");

class PostService {
  validatePost = (data, isEdit = false) => {
    let err = {};
    if (!data.title) {
      err["title"] = "Title is required.";
    }
    if (!isEdit) {
      if (!data.date) {
        err["date"] = "Please specify the date for this post.";
      }
    }
    if (!data.content) {
      err["content"] = "There is no content for this post.";
    }

    if (Object.keys(err).length) {
      throw err;
    } else {
      return null;
    }
  };

  getPostSlug = (str) => {
    return slugify(str.toLowerCase());
  };
}

module.exports = PostService;
