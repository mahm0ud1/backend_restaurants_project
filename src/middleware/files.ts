const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const { db_url, db_name } = require("../db/index");

var storage = new GridFsStorage({
  url: `mongodb+srv://${db_url}/${db_name}`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req: any, file: { mimetype: string; originalname: any; }) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      return file.originalname;
    }

    return {
      bucketName: "photos",
      filename: file.originalname
    };
  }
});

var uploadFiles = multer({ storage: storage }).array("file", 10);
var Upload = util.promisify(uploadFiles);
export { Upload };
