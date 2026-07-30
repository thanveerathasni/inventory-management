import jwt, { Secret, SignOptions } from 'jsonwebtoken';

import { env } from '../config/env';

interface JwtPayload {
  id: string;
  email: string;
}

export const generateAccessToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(payload, env.JWT_SECRET as Secret, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  });
};

export const generateRefreshToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET as Secret, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'],
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET as Secret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET as Secret) as JwtPayload;
};