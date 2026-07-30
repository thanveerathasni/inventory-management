import { NextFunction, Request, Response } from 'express';

import { AppError } from '../common/AppError';
import { AUTH_MESSAGES } from '../constants/apiMessages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { User } from '../models/User.model';
import { verifyAccessToken } from '../utils/jwt';

export const protect = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(
        AUTH_MESSAGES.UNAUTHORIZED,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const token = authHeader.split(' ')[1];

    const payload = verifyAccessToken(token);

    const user = await User.findById(payload.id).select('-password -refreshToken');

    if (!user) {
      throw new AppError(
        AUTH_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};