import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

import jwt from 'jsonwebtoken';

dotenv.config();

const {GOOGLE_CREDENTIAL, JWT_SECRET} = process.env;
if(!GOOGLE_CREDENTIAL) {
    throw new Error('GOOGLE_CREDENTIAL não encontrado')
}

if(!JWT_SECRET) {
    throw new Error('JWT_SECRET não encontrado')
}


const client = new OAuth2Client(GOOGLE_CREDENTIAL);

const unAuthorized = (res: Response) => res.sendStatus(401);

export const authMiddleware = async (req: Request, res: Response) => {
    
    const token = req.body.token?.replace('Bearer ', '');
    if(!token) {
        return unAuthorized(res);
    }

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CREDENTIAL,
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

    const accessToken = jwt.sign({
        sub: userId,
        name: payload.name,
        email: payload.email,
    }, JWT_SECRET, { expiresIn: '2 minutes' });

    return res.json({
        accessToken,
    })
};
