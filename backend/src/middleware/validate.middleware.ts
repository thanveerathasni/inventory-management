import { NextFunction, Request, Response } from 'express';
import { ZodError,ZodObject } from 'zod';

import { AppError } from '../common/AppError';
import { COMMON_MESSAGES } from '../constants/apiMessages';
import { HTTP_STATUS } from '../constants/statusCodes';

export const validate =
  (schema: ZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new AppError(
            error.issues.map((issue) => issue.message).join(', '),
            HTTP_STATUS.BAD_REQUEST
          )
        );
      }

      next(
        new AppError(
          COMMON_MESSAGES.VALIDATION_FAILED,
          HTTP_STATUS.BAD_REQUEST
        )
      );
    }
  };