import multer from "multer";
import path from "path";

// Get the current file name

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let imgDest = path.resolve(path.join("features", "uploads", "images"));
    cb(null, imgDest);
  },

  filename: function (req, file, cb) {
    let fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default upload;
