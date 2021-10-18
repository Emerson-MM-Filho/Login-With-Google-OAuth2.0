import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = '946242776728-hetk06u45drp07qrgohj4hbciq417p34.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const unAuthorized = (res: Response) => res.sendStatus(401);

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token) {
        return unAuthorized(res);
    }

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    })
    .catch(() => {
        return null;
    })

    if(!ticket) {
        return unAuthorized(res);
    }

    const payload = ticket.getPayload();
    if(!payload) {
        return unAuthorized(res);
    }

    const userId = payload.sub;
    res.locals['userId'] = userId;

    next();
};
