import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from '../common/ApiResponse';
import { AppError } from '../common/AppError';
import { asyncHandler } from '../common/asyncHandler';
import { AUTH_MESSAGES } from '../constants/apiMessages';
import { refreshTokenCookieOptions } from '../constants/cookieOptions';
import { HTTP_STATUS } from '../constants/statusCodes';
import { AuthService } from '../services/AuthService';
import {
  verifyRefreshToken,
} from '../utils/jwt';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user = await this.authService.register(req.body);

      res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse(
          true,
          HTTP_STATUS.CREATED,
          AUTH_MESSAGES.REGISTER_SUCCESS,
          user
        )
      );
    }
  );

login = asyncHandler(async (req: Request, res: Response) => {
  const result = await this.authService.login(req.body);

  res.cookie(
    'refreshToken',
    result.refreshToken,
    refreshTokenCookieOptions
  );
const { password:_password, refreshToken:_refreshToken, ...userData } = result.user.toObject();

return res.status(HTTP_STATUS.OK).json(
  new ApiResponse(
    true,
    HTTP_STATUS.OK,
    AUTH_MESSAGES.LOGIN_SUCCESS,
    {
      user: userData,
      accessToken: result.accessToken,
    }
  )
);
});

refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  const result = await this.authService.refreshToken(refreshToken);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
        true,
      HTTP_STATUS.OK,
      AUTH_MESSAGES.TOKEN_REFRESHED,
      result
    )
  );
});

logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError(
      AUTH_MESSAGES.INVALID_REFRESH_TOKEN,
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  const payload = verifyRefreshToken(refreshToken);

  await this.authService.logout(payload.id);

  res.clearCookie(
    'refreshToken',
    refreshTokenCookieOptions
  );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      true,
      HTTP_STATUS.OK,
      AUTH_MESSAGES.LOGOUT_SUCCESS
    )
  );
});


}