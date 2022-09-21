//Use multer where validation of form data is to be handled
const multer = require("multer");
const { makeDirectory } = require("../../Config/functions");

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    makeDirectory(req.dest);
    let path = process.cwd() + "/uploads/" + req.dest; //or path set gare ni vo
    cb(null, path);
  },
  filename: (req, file, cb) => {
    let date = Date.now();
    let file_name = date + "-" + file.originalname;
    req.imgName = file_name;
    cb(null, file_name);
  },
});

const imageFilter = (req, file, cb) => {
  allowedImages = ["jpg", "jpeg", "png", "svg", "gif", "bmp"];
  let fileExtension = file.originalname.split(".");
  fileExtension = fileExtension[fileExtension.length - 1];

  if (fileExtension && allowedImages.includes(fileExtension.toLowerCase())) {
    cb(null, true);
  } else {
    cb(
      {
        status: 400,
        msg: "Unsupported file format",
      },
      false
    );
  }
};
const uploader = multer({
  // dest: "Uploads",
  storage: myStorage,
  fileFilter: imageFilter,
});

module.exports = uploader;
