var multer  = require('multer');
var fs  = require('fs');
var path = require('path');
var fileName;
const dir = './cvUploads';

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
      if (!fs.existsSync(dir)){
       fs.mkdirSync(dir);
      }
      callback(null, dir);
    },
    filename: (req, file, callback) => {
        fileName = Date.now() + '-' + file.originalname;
        callback(null, fileName);
    }
});

let upload = multer({
    storage: storage,
    fileFilter: (_, file, cb) => {
        const fileTypes = /doc|docx|pdf/;
        const extname = fileTypes.test(
          path.extname(file.originalname).toLowerCase()
        );
        const mimetype = fileTypes.test(file.mimetype);
    
        if (extname && mimetype) return cb(null, true);
        return cb(new Error("Only files of type .doc/.docx/pdf are allowed"));
      },
});

function uploadFileOptions(req, res, next) {
    const uploadSingle = upload.single("file");
  
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
  
