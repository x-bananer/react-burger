import styles from './register.module.css';

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const API_REGISTER_URL = 'https://norma.nomoreparties.space/api/auth/register';

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const [email, setEmail] = useState('')
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = useState('')
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onClickToLogin = () => {
        navigate('/login');
    };

    const onClickRegister = async () => {
        try {
            const res = await fetch(API_REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    name
                })
            });

            const data = await res.json();

            if (data.success) {
                navigate('/');
            } else {
                console.error(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles['register']}>
            <div className={styles['register__container']}>
                <div className={`${styles.register__form} mb-20`}>
                    <p className="text text_type_main-medium mb-6">
                        Регистрация
                    </p>
                    <Input
                        extraClass="mb-6"
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChangeName}
                        value={name}
                        name={'name'}
                    />
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
                    <Button htmlType="button" type="primary" size="medium" onClick={onClickRegister}>
                        Зарегистрироваться
                    </Button>
                </div>
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