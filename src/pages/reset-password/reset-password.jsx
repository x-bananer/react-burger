import styles from './reset-password.module.css';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ResetPasswordPage = () => {
    const API_RESET_PASSWORD_URL = 'https://norma.nomoreparties.space/api/password-reset/reset';

    const navigate = useNavigate();
    const { canResetPassword } = useSelector(state => state.auth);

    const [form, setForm] = useState({ token: '', password: ''});
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onClickToLogin = () => {
        navigate('/login');
    };

    const onSubmitResetPassword = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch(API_RESET_PASSWORD_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
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

    useEffect(() => {
        if (!canResetPassword) {
            navigate('/forgot-password', { replace: true });
        }
    }, [canResetPassword, navigate]);

    return (
        <div className={styles['reset-password']}>
            <div className={styles['reset-password__container']}>
                <form className={`${styles['reset-password__form']} mb-20`} onSubmit={onSubmitResetPassword}>
                    <p className="text text_type_main-medium mb-6">
                        Восстановление пароля
                    </p>
                    <PasswordInput
                        onChange={onChange}
                        placeholder={'Введите новый пароль'}
                        value={form.password}
                        name={'password'}
                        extraClass="mb-6"
                    />
                    <Input
                        extraClass="mb-6"
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onChange}
                        value={form.token}
                        name={'token'}
                    />
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </form>
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