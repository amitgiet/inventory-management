const multer = require("multer");
const fs = require("fs");
const path = require("path");

function fileUploader(dir = "./uploads/others", fields = []) {
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      console.log();
      if (!fs.existsSync("./uploads/" + dir)) {
        fs.mkdirSync("./uploads/" + dir, { recursive: true });
      }
      if (req?.body?.image_dir) {
        dir = req?.body?.image_dir;
      }
      callback(null, "./uploads/" + dir);
    },
    filename: function (req, file, callback) {
      let fileName = file.originalname.replace(/\s/g, "");
      const uniqueFilename = `${Date.now()}-${fileName}`;
      callback(null, uniqueFilename);
    },
  });

  const multerInstance = multer({
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 },
  });

  return multerInstance.fields(fields);
}

function fileUploader2(dir = "others") {
  const uploadPath = path.join(__dirname, "..", "uploads", dir);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, uploadPath),
    filename: (_, file, cb) => {
      const cleanName = file.originalname.replace(/\s+/g, "");
      cb(null, `${Date.now()}-${cleanName}`);
    },
  });

  return multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }).any();
}

module.exports = {
  fileUploader,
  fileUploader2,
};
