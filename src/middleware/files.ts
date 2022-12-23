const mongoose = require("mongoose");
const util = require("util");
const multer = require("multer");
const GridFsStorage = require('multer-gridfs-storage');
const { db_url, db_name } = require("../db/index");
const Grid = require("gridfs-stream");

let GFS:any, GridFSBucker:any;

// let conn = mongoose.connection;
// conn.once('open', () => {
//   GridFSBucker = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: 'photos'
//   });

//   GFS = Grid(conn.db, mongoose.mongo);
//   GFS.collection('photos');
// })

var storage = new GridFsStorage({
  url: `mongodb+srv://${db_url}/${db_name}?authSource=admin`,
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

// const promise = mongoose.connect(`mongodb+srv://${db_url}/${db_name}`);

// const storage = new GridFsStorage({
//   db: promise,
//   file: (req:any, file:any) => {
//     return new Promise((resolve, reject) => {
//         const filename = file.originalname;
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'photos'
//         };
//         resolve(fileInfo);
//     });
//   }
// });
// const Upload = multer({ storage });

export { Upload, GFS, GridFSBucker };
