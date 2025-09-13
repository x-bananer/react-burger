import styles from './login.module.css';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = useState('')
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onClickToRegister = () => {
        navigate('/register');
    };

    const onClickToForgotPassword = () => {
        navigate('/forgot-password');
    };

    return (
        <div className={styles['login']}>
            <div className={styles['login__container']}>
                <div className={`${styles.login__form} mb-20`}>
                    <p className="text text_type_main-medium mb-6">
                        Вход
                    </p>
                    <EmailInput
                        extraClass="mb-6"
                        onChange={onChangeEmail}
                        value={email}
                        name={'email'}
                        isIcon={false}
                    />
                    <PasswordInput
                        onChange={onChangePassword}
                        value={password}
                        name={'password'}
                        extraClass="mb-6"
                    />
                    <Button htmlType="button" type="primary" size="medium">
                        Войти
                    </Button>
                </div>
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