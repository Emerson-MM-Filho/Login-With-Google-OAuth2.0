import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import jwt from 'jsonwebtoken';

dotenv.config();

const { JWT_SECRET} = process.env;
if(!JWT_SECRET) {
    throw new Error('JWT_SECRET não encontrado')
}

const unAuthorized = (res: Response) => res.sendStatus(401);

export const alreadyAuthenticatedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token) {
        return unAuthorized(res);
    }

    return jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) {
            return unAuthorized(res);
        }

        if(!decoded) {
            return unAuthorized(res);
        }

        res.locals['userid'] = decoded.sub;
        return next();
    });
}