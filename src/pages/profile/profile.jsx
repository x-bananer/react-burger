import styles from './profile.module.css';

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import { NavLink, useOutlet, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';;

import { updateUser, logout } from '../../services/actions/auth.js';

const ProfilePage = () => {
    const outlet = useOutlet();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);

    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: ''
    });

    const isUserDataChanged = user && (form.name !== user.name || form.email !== user.email || form.password !== '');

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onCancelChange = () => {
        setForm({ name: user.name, email: user.email, password: '' });
    }

    const onSubmitUserUpdate = async (e) => {
        e.preventDefault();
        dispatch(updateUser(form));
    };

    const onClickLogout = async () => {
        try {
            const res = await dispatch(logout());
            if (res?.success) {
                navigate('/login', { replace: true });
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user) {
            setForm({ name: user.name, email: user.email, password: '' });
        }
    }, [user]);

    return (
        <div className={styles['profile']}>
            <div className={styles['profile__container']}>
                <div className={`${styles['profile__aside']} mr-15`}>
                    <div className={`${styles['profile__nav']} mb-20`}>
                        <NavLink to="/profile" end className={styles['profile__nav-link']}>
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
                        <NavLink to="/profile/orders" end className={styles['profile__nav-link']}>
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
                        <Button onClick={onClickLogout} htmlType="button" extraClass={styles['profile__nav-button']}>
                            Выход
                        </Button>
                    </div>
                    <p className={`${styles['profile__caption']} text text_type_main-default text_color_inactive`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </div>
                <div className={styles['profile__main']}>
                    {!outlet && (
                        <form onSubmit={onSubmitUserUpdate}>
                            <Input
                                extraClass="mb-6"
                                type="text"
                                placeholder="Имя"
                                onChange={onChange}
                                value={form.name}
                                name="name"
                                icon="EditIcon"
                            />
                            <EmailInput
                                extraClass="mb-6"
                                onChange={onChange}
                                placeholder="Логин"
                                value={form.email}
                                name="email"
                                isIcon={true}
                            />
                            <PasswordInput
                                onChange={onChange}
                                value={form.password}
                                name="password"
                                icon="EditIcon"
                            />
                            {isUserDataChanged && (
                                <div className="mt-6">
                                    <Button htmlType="submit" type="primary" size="medium">
                                        Сохранить
                                    </Button>
                                    <Button
                                        htmlType="button"
                                        type="secondary"
                                        size="medium"
                                        onClick={onCancelChange}
                                        extraClass="ml-2"
                                    >
                                        Отмена
                                    </Button>
                                </div>
                            )}
                        </form>
                    )}
                    {outlet}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;