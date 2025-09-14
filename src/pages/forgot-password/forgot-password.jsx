import styles from './forgot-password.module.css';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCanResetPassword } from '../../services/actions/auth.js';

const ForgotPasswordPage = () => {
    const API_FORGOT_PASSWORD_URL = 'https://norma.nomoreparties.space/api/password-reset';

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    
    const onClickToLogin = () => {
        navigate('/login');
    };

    const onClickResetPassword = async () => {
        try {
            const res = await fetch(API_FORGOT_PASSWORD_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                })
            });

            const data = await res.json();

            if (data.success) {
                navigate('/reset-password');
                dispatch(setCanResetPassword(true));
            } else {
                console.error(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles['forgot-password']}>
            <div className={styles['forgot-password__container']}>
                <div className={`${styles['forgot-password__form']} mb-20`}>
                    <p className="text text_type_main-medium mb-6">
                        Восстановление пароля
                    </p>
                    <EmailInput
                        extraClass="mb-6"
                        placeholder="Укажите e-mail"
                        onChange={onChangeEmail}
                        value={email}
                        name={'email'}
                        isIcon={false}
                    />
                    <Button htmlType="button" type="primary" size="medium" onClick={onClickResetPassword}>
                        Восстановить
                    </Button>
                </div>
                <div className={styles['forgot-password__form']}>
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

export default ForgotPasswordPage;