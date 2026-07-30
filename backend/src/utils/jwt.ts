import jwt, { Secret, SignOptions } from 'jsonwebtoken';

import { AppError } from '../common/AppError';
import { env } from '../config/env';
import { AUTH_MESSAGES } from '../constants/apiMessages';
import { HTTP_STATUS } from '../constants/statusCodes';

export interface TokenPayload {
  id: string;
  email: string;
}

const accessSecret: Secret = env.JWT_SECRET;
const refreshSecret: Secret = env.JWT_REFRESH_SECRET;

const accessExpiresIn: SignOptions['expiresIn'] =
  env.JWT_EXPIRES_IN as SignOptions['expiresIn'];

const refreshExpiresIn: SignOptions['expiresIn'] =
  env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'];

export const generateAccessToken = (
  payload: TokenPayload
): string => {
  return jwt.sign(payload, accessSecret, {
    expiresIn: accessExpiresIn,
  });
};

export const generateRefreshToken = (
  payload: TokenPayload
): string => {
  return jwt.sign(payload, refreshSecret, {
    expiresIn: refreshExpiresIn,
  });
};

export const verifyAccessToken = (
  token: string
): TokenPayload => {
  try {
    return jwt.verify(token, accessSecret) as TokenPayload;
  } catch {
    throw new AppError(
      AUTH_MESSAGES.INVALID_TOKEN,
      HTTP_STATUS.UNAUTHORIZED
    );
  }
};

export const verifyRefreshToken = (
  token: string
): TokenPayload => {
  try {
    return jwt.verify(token, refreshSecret) as TokenPayload;
  } catch {
    throw new AppError(
      AUTH_MESSAGES.INVALID_REFRESH_TOKEN,
      HTTP_STATUS.UNAUTHORIZED
    );
  }
};