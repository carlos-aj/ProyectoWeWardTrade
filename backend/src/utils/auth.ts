import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret: jwt.Secret = process.env.JWT_SECRET || 'supersecret';

export function generateToken(payload: { [key: string]: any }, expiresIn: string = '7d') {
  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret);
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token requerido' });
  }
  try {
    const user = verifyToken(token);
    // @ts-ignore
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
}
