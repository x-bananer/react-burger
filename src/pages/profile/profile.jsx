import styles from './profile.module.css';

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { EditIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { NavLink } from 'react-router-dom';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
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

    return (
        <div className={styles['profile']}>
            <div className={styles['profile__container']}>
                <div className={`${styles['profile__aside']} mr-15`}>
                    <div className={`${styles['profile__nav']} mb-20`}>
                        <NavLink to="/profile" className={styles['profile__nav-link']}>
                            {({ isActive }) => (
                                <p
                                    className={
                                        isActive
                                            ? 'text text_type_main-medium'
                                            : 'text text_type_main-medium text_color_inactive'
                                    }
                                >
                                    Профиль
                                </p>
                            )}
                        </NavLink>
                        <NavLink to="/orders" className={styles['profile__nav-link']}>
                            {({ isActive }) => (
                                <p
                                    className={
                                        isActive
                                            ? 'text text_type_main-medium'
                                            : 'text text_type_main-medium text_color_inactive'
                                    }
                                >
                                    История заказов
                                </p>
                            )}
                        </NavLink>
                        <NavLink to="/login" className={styles['profile__nav-link']}>
                            {({ isActive }) => (
                                <p
                                    className={
                                        isActive
                                            ? 'text text_type_main-medium'
                                            : 'text text_type_main-medium text_color_inactive'
                                    }
                                >
                                    Выход
                                </p>
                            )}
                        </NavLink>
                    </div>
                    <p className={`${styles['profile__caption']} text text_type_main-default text_color_inactive`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>

                </div>
                <div className={styles['profile__main']}>
                    <Input
                        extraClass="mb-6"
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChangeName}
                        value={name}
                        name={'name'}
                        icon="EditIcon"
                    />
                    <EmailInput
                        extraClass="mb-6"
                        onChange={onChangeEmail}
                        placeholder={'Логин'}
                        value={email}
                        name={'email'}
                        isIcon={true}
                    />
                    <PasswordInput
                        onChange={onChangePassword}
                        value={password}
                        name={'password'}
                        icon="EditIcon"
                    />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;