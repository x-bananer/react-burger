import styles from './reset-password.module.css';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
    const API_RESET_PASSWORD_URL = 'https://norma.nomoreparties.space/api/password-reset/reset';

    const navigate = useNavigate();

    const [token, setToken] = useState('')
    const onChangeToken = (e) => {
        setToken(e.target.value)
    }

    const [password, setPassword] = useState('')
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onClickToLogin = () => {
        navigate('/login');
    };

    const onClickSavePassword = async () => {
        try {
            const res = await fetch(API_RESET_PASSWORD_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password,
                    token
                })
            });

            const data = await res.json();

            if (data.success) {
               navigate('/login')
            } else {
                console.error(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles['reset-password']}>
            <div className={styles['reset-password__container']}>
                <div className={`${styles['reset-password__form']} mb-20`}>
                    <p className="text text_type_main-medium mb-6">
                        Восстановление пароля
                    </p>
                    <PasswordInput
                        onChange={onChangePassword}
                        placeholder={'Введите новый пароль'}
                        value={password}
                        name={'password'}
                        extraClass="mb-6"
                    />
                    <Input
                        extraClass="mb-6"
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onChangeToken}
                        value={token}
                        name={'token'}
                    />
                    <Button htmlType="button" type="primary" size="medium" onClick={onClickSavePassword}>
                        Сохранить
                    </Button>
                </div>
                <div className={styles['reset-password__form']}>
                    <div>
                        <span className="text text_type_main-default text_color_inactive">
                            Вспомнили пароль?
                        </span>
                        <Button htmlType="button" type="secondary" size="medium" extraClass="pl-2 pr-2 pt-2 pb-2" onClick={onClickToLogin}>
                            Войти
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;