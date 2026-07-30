import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { PROTECTED_ROUTES } from '../../constants/routes';
import {
  loginUser,
  selectAuthError,
  selectIsAuthLoading,
  type LoginFormValues,
} from '../../features/auth';
import type { AppDispatch } from '../../store/store';

import { LoginForm } from './LoginForm';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectIsAuthLoading);
  const navigate = useNavigate();

  const handleLogin = async (values: LoginFormValues): Promise<void> => {
    const result = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(result)) {
      navigate(PROTECTED_ROUTES.DASHBOARD);
    }
  };

  return (
    <main className={styles.page}>
      <section aria-labelledby="login-title" className={styles.panel}>
        <h1 id="login-title">Sign in</h1>
        <LoginForm error={error} isLoading={isLoading} onSubmit={handleLogin} />
      </section>
    </main>
  );
};
