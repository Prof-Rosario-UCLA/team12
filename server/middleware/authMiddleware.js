import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found with this token' });
            }
            next();
        } catch (error) {
            console.error('Token verification error (from header):', error);
            return res.status(401).json({ message: 'Not authorized, token failed (header)' });
        }
    } else if (req.cookies && req.cookies.token) { // Fallback to cookie
        try {
            token = req.cookies.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found with this cookie token' });
            }
            next();
        } catch (error) {
            console.error('Token verification error (from cookie):', error);
            return res.status(401).json({ message: 'Not authorized, token failed (cookie)' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
}; 