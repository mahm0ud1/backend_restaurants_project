import { Upload } from "../middleware/files"

import mongoose from "mongoose";
const Grid = require("gridfs-stream");

let gfs:any, gridfsBucket:any;

const conn = mongoose.connection;
conn.once('open', () => {
 gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
 bucketName: 'photos'
});

 gfs = Grid(conn.db, mongoose.mongo);
 gfs.collection('photos');
})

export class FilesDal {

    public async uploadImage(req: any, res: any) {
        try {
            await Upload(req, res);

            if (req.files.length <= 0) {
                return {
                    code: 400,
                    message: "You must select at least 1 file."
                };
            }

            return {
                code: 200,
                message: "Files have been uploaded."
            };
        } catch (error: any) {
            console.log(error);

            if (error.code === "LIMIT_UNEXPECTED_FILE") {
                return {
                    code: 400,
                    message: "Too many files to upload."
                };
            }
            return {
                code: 500,
                message: `Error when trying upload many files: ${error}`
            };
        }
    }

    public async downloadImage(photo_name: string) {
        try {
            const file = await gfs.files.findOne({ filename: photo_name });
            const readStream = gridfsBucket.openDownloadStream(file._id);
            return readStream;
        } catch (error) {
            
        }
    }
}
