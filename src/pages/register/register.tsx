import React from 'react';
import styles from './register.module.css';

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useForm } from '../../hooks/useForm.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { register } from '../../services/actions/auth.js';

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch: any = useDispatch();

    const [form, onChange] = useForm({ name: '', email: '', password: '' });

    const onClickToLogin = () => {
        navigate('/login');
    };

    const onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await dispatch(register(form.email, form.password, form.name));
            if (res?.success) {
                navigate('/', { replace: true });
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles['register']}>
            <div className={styles['register__container']}>
                <form className={`${styles.register__form} mb-20`} onSubmit={onSubmitRegister}>
                    <p className="text text_type_main-medium mb-6">
                        Регистрация
                    </p>
                    { /* @ts-ignore */ }
                    <Input
                        extraClass="mb-6"
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'}
                        autoComplete="given-name"
                        value={form.name}
                        onChange={onChange as any}
                    />
                    <EmailInput
                        extraClass="mb-6"
                        autoComplete="email"
                        name={'email'}
                        isIcon={false}
                        value={form.email}
                        onChange={onChange}
                    />
                    <PasswordInput
                        name={'password'}
                        extraClass="mb-6"
                        autoComplete="new-password"
                        value={form.password}
                        onChange={onChange}
                    />
                    <Button type="primary" size="medium" htmlType="submit">
                        Зарегистрироваться
                    </Button>
                </form>
                <div className={styles['register__form']}>
                    <div>
                        <span className="text text_type_main-default text_color_inactive">
                            Уже зарегистрированы?
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

export default RegisterPage;