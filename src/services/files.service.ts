import { FilesDal } from "../dal/files.dal";

export class FilesService {
    public async uploadImage(req:any, res:any) {
        const dal = new FilesDal();
        res = await dal.uploadImage(req, res);
        return res;
    }
    
    public async downloadImage(imageName:string) {
        const dal = new FilesDal();
        const res = await dal.downloadImage(imageName);
        return res;
    }
}