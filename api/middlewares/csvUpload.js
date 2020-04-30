const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    const dir = `./storage/csv`;

    fs.exists(dir, (exist) => {
      if (!exist)
        return fs.mkdir(dir, { recursive: true }, (error) => cb(error, dir));

      return cb(null, dir);
    });
  },

  filename: (_, file, cb) => {
    cb(null, `employee${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50000000 },
  fileFilter: (_, file, cb) => {
    const fileTypes = /csv|vnd.ms-excel/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) return cb(null, true);
    return cb(new Error("Only CSVs are allowed"));
  },
});

function uploadFileOptions(req, res, next) {
  const uploadSingle = upload.single("csvUpload");

  uploadSingle(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      return res.status(400).send({
        success: false,
        payload: {
          message: error.message,
        },
      });
    }
    if (error) {
      return res.status(500).send({
        success: false,
        payload: {
          message: error.message,
        },
      });
    }

    next();
  });
}

module.exports = uploadFileOptions;
