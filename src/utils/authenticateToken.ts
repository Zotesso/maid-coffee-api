import jwt, { Secret } from 'jsonwebtoken';
require('dotenv').config();

const authenticateToken = (authHeader: string | undefined): boolean | string | object => {
    try {
        const token = authHeader && authHeader.split(' ')[1];

        if (token === null) return false;
        if (token === undefined) return false;

        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret);
    } catch (error) {
        return false;
    }
}

export default authenticateToken;
