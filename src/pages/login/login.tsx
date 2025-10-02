import React from 'react';
import styles from './login.module.css';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useForm } from '../../hooks/useForm.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../../services/actions/auth.js';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: any = useDispatch();

    const [form, onChange] = useForm({ email: '', password: '' });

    const onClickToRegister = (): void => {
        navigate('/register');
    };

    const onClickToForgotPassword = (): void => {
        navigate('/forgot-password');
    };

    const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const res = await dispatch(login(form));
            if (res?.success) {
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            }
        } catch (err) {
            
            console.error(err);
        }
    };

    return (
        <div className={styles['login']}>
            <div className={styles['login__container']}>
                <form className={`${styles.login__form} mb-20`} onSubmit={onSubmitLogin}>
                    <p className="text text_type_main-medium mb-6">
                        Вход
                    </p>
                    <EmailInput
                        extraClass="mb-6"
                        autoComplete="email"
                        onChange={onChange}
                        value={form.email}
                        name={'email'}
                        isIcon={false}
                    />
                    <PasswordInput
                        onChange={onChange}
                        value={form.password}
                        name={'password'}
                        extraClass="mb-6"
                        autoComplete="current-password"
                    />
                    <Button htmlType="submit" type="primary" size="medium">
                        Войти
                    </Button>
                </form>
                <div className={styles['login__form']}>
                    <div>
                        <span className="text text_type_main-default text_color_inactive">
                            Вы — новый пользователь?
                        </span>
                        <Button htmlType="button" type="secondary" size="medium" extraClass="pl-2 pr-2 pt-2 pb-2" onClick={onClickToRegister}>
                            Зарегистрироваться
                        </Button>
                    </div>
                    <div>
                        <span className="text text_type_main-default text_color_inactive">
                            Забыли пароль?
                        </span>
                        <Button htmlType="button" type="secondary" size="medium" extraClass="pl-2 pr-2 pt-2 pb-2" onClick={onClickToForgotPassword}>
                            Восстановить пароль
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;