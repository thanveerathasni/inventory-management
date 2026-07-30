import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from '../common/ApiResponse';
import { asyncHandler } from '../common/asyncHandler';
import { AUTH_MESSAGES } from '../constants/apiMessages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { AuthService } from '../services/AuthService';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user = await this.authService.register(req.body);

      res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
          true,
          AUTH_MESSAGES.REGISTER_SUCCESS,
          user
        )
      );
    }
  );

login = asyncHandler(async (req, res) => {
  const result = await this.authService.login(req.body);

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      true,
      AUTH_MESSAGES.LOGIN_SUCCESS,
      {
        user: result.user,
        accessToken: result.accessToken,
      }
    )
  );
});
}