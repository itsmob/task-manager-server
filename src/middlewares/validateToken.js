import jwt from 'jsonwebtoken';
import { TOKEN_SECRECT } from '../config.js';

export function authRequired(req, res, next) {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: 'no token, authorization denied' });

  jwt.verify(token, TOKEN_SECRECT, (error, user) => {
    if (error) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;
    next();
  });
}
