import { AppError } from '../common/AppError';
import { AUTH_MESSAGES } from '../constants/apiMessages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { AuthRepository } from '../repositories/AuthRepository';
import { comparePassword, hashPassword } from '../utils/hash';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken    
} from '../utils/jwt';
import {
  LoginDto,
  RegisterDto,
} from '../validations/auth.validation';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(userData: RegisterDto) {
    const existingUser = await this.authRepository.findByEmail(
      userData.email
    );

    if (existingUser) {
      throw new AppError(
        AUTH_MESSAGES.EMAIL_ALREADY_EXISTS,
        HTTP_STATUS.CONFLICT
      );
    }

    const hashedPassword = await hashPassword(userData.password);

    const user = await this.authRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return user;
  }

  async login(loginData: LoginDto) {
    const user = await this.authRepository.findByEmail(
      loginData.email
    );

    if (!user) {
      throw new AppError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const isPasswordValid = await comparePassword(
      loginData.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new AppError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const payload = {
      id: user._id.toString(),
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await this.authRepository.updateRefreshToken(
      user._id.toString(),
      refreshToken
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }


  async refreshToken(refreshToken: string) {
  if (!refreshToken) {
    throw new AppError(
      AUTH_MESSAGES.INVALID_REFRESH_TOKEN,
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  const payload = verifyRefreshToken(refreshToken);

  const user = await this.authRepository.findById(payload.id);

  if (!user) {
    throw new AppError(
      AUTH_MESSAGES.INVALID_REFRESH_TOKEN,
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  if (user.refreshToken !== refreshToken) {
    throw new AppError(
      AUTH_MESSAGES.INVALID_REFRESH_TOKEN,
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  const newAccessToken = generateAccessToken({
    id: user._id.toString(),
    email: user.email,
  });

  return {
    accessToken: newAccessToken,
  };
}

async logout(userId: string) {
  await this.authRepository.clearRefreshToken(userId);
}
}