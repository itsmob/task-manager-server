import jwt from 'jsonwebtoken';
import { TOKEN_SECRECT } from '../config.js';

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRECT,
      {
        expiresIn: '1d',
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      },
    );
  });
}
