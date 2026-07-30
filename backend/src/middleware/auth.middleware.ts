import { NextFunction, Request, Response } from 'express';

import { AppError } from '../common/AppError';
import { AUTH_MESSAGES } from '../constants/apiMessages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { verifyAccessToken } from '../utils/jwt';

export const protect = (
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

    req.user = {
      id: payload.id,
      email: payload.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};