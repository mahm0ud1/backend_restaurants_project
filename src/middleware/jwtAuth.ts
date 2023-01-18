import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Token from '../interface/tokenInterface';

export const SECRET_KEY: Secret = 'your-secret-key-here';
export const JWT_EXPIRY_HOURS = 2*60*60;

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.jsessionid as string;

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};


export const createToken = (userID:String) => {

	const token = jwt.sign({ userID }, SECRET_KEY, {
		algorithm: "HS256",
		expiresIn: JWT_EXPIRY_HOURS,
	})

	return token;
}

export const getUserID = (req: Request) => {
    try {
        const token = (req as CustomRequest).token as Token;
        return token.userID;
    }
    catch(error)
    {
        throw new Error('Please authenticate');
    }
}
