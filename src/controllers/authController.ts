import { Request, Response } from "express";
import { JWT_EXPIRY_HOURS } from "../middleware/jwtAuth";
import { AuthService } from "../services/auth.service";
import { RESTPONSE_IMPL, USER_TOKEN } from "../types/responds";

export class AuthController {
    public static async register(req: Request, res: Response) {
        try {
            const user = req.body;
            const service = new AuthService();
            const userRes: RESTPONSE_IMPL = await service.register(user);
            return res.status(userRes.getStatusCode()).send(userRes.getMessage());
        }
        catch (error) {
            console.log(error);
        }
        return "ERROR";
    }


    public static async login(req: Request, res: Response) {
        try {
            const user = req.body;
            const service = new AuthService();
            const userRes: RESTPONSE_IMPL = await service.login(user);
            if (userRes instanceof USER_TOKEN) {
                return res.status(userRes.getStatusCode()).send({
                    jsessionid: userRes.getMessage(),
                    Message: "Success"
                });
            }
            return res.status(userRes.getStatusCode()).send({
                Message: userRes.getMessage()
            });
        }
        catch (error) {
            console.log(error);
        }
        return "ERROR";
    }
}
