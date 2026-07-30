import { Router } from 'express';

import { AuthController } from '../controllers/AuthController';
import { AuthRepository } from '../repositories/AuthRepository';
import { AuthService } from '../services/AuthService';

const router = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post('/register', authController.register);

router.post('/login', authController.login);

export default router;