import { Upload, GFS, GridFSBucker } from "../middleware/files"

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
        }
    }

    public async downloadImage(photo_name: string) {
        try {
            const file = await GFS.files.findOne({ filename: photo_name });
            const readStream = GridFSBucker.openDownloadStream(file._id);
            return readStream;
        } catch (error) {

        }
    }

    public async deleteImage(photo_name: string) {
        try {
            await GFS.files.deleteOne({ filename: photo_name });
            return "success";
        } catch (error) {
            return "An error occured.";
        }
    }
}
