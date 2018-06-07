import jwt from 'jsonwebtoken';
import constanst from '../config/constants';
import User from '../models//users';

export async function requireAuth(user) {
    if (!user || !user._id) {
        throw new Error('Unauthorized');
    }
    const me = User.findById(user._id);
    if (!me) {
        throw new Error('Unauthorized');
    }
    return me;
}

export function decodeToken(token) {
    const arr = token.split(' ');
    
    if (arr[0] === 'Bearer') {
        return jwt.verify(arr[1], constanst.JWT_SECRET);
    }

    throw new Error('Token not valid!');
}