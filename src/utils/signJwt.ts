import jwt from 'jsonwebtoken';
import { jwtClaims } from './executor';

const signJwt = (userId: string) =>
  jwt.sign(jwtClaims(userId), process.env.HASURA_JWT_SECRET, {
    algorithm: 'HS256',
  });

export { signJwt };
