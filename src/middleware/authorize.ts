import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.models';

const JWT_SECRET = 'your_jwt_secret';

// Extender la interfaz Request de Express
interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token recibido:', token); // Agrega este log
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as User;
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Error al verificar el token:', error); // Agrega este log
      res.status(400).json({ message: 'Invalid token.' });
    }
  };

export const authorize = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
    }
    next();
  };
};
