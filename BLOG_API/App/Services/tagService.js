const slugify = require("slugify");

class TagService {
  validateTag = (data) => {
    let errMsg = {};

    if (!data.title) {
      errMsg["title"] = "Title of tag is required.";
    }

    if (!data.image) {
      errMsg["image"] = "Image is required for tag.";
    }

    if (Object.keys(errMsg).length) {
      throw errMsg;
    } else {
      return null;
    }
  };

  getTagSlug = (title) => {
    return slugify(title.toLowerCase());
  };
}

module.exports = TagService;
