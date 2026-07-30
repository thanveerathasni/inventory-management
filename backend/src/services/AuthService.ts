import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AppError } from '../common/AppError';
import { env } from '../config/env';
import { AUTH_MESSAGES } from '../constants/apiMessages';
import { HTTP_STATUS } from '../constants/statusCodes';
import { IUser } from '../models/User.model';
import { AuthRepository } from '../repositories/AuthRepository';
import { LoginDto, RegisterDto } from '../validations/auth.validation';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async register(userData: RegisterDto): Promise<IUser> {
    const existingUser = await this.authRepository.findByEmail(
      userData.email
    );

    if (existingUser) {
      throw new AppError(
        AUTH_MESSAGES.EMAIL_ALREADY_EXISTS,
        HTTP_STATUS.CONFLICT
      );
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await this.authRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return user;
  }

  async login(loginData: LoginDto): Promise<string> {
    const user = await this.authRepository.findByEmail(
      loginData.email
    );

    if (!user) {
      throw new AppError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new AppError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRES_IN,
      }
    );

    return token;
  }
}