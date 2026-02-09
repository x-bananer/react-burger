import type { FC } from 'react';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

const AppHeader: FC = () => {
    return (
        <header className={`${styles['app-header']} pt-4 pb-4`}>
            <nav className={styles['app-header__nav']}>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive
                            ? `${styles['app-header__nav-link']} ${styles['app-header__nav-link--active']} pl-5 pr-5 mr-2`
                            : `${styles['app-header__nav-link']} pl-5 pr-5 mr-2`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <BurgerIcon className="pr-2" type="secondary" />
                            <p
                                className={
                                    isActive
                                        ? 'text text_type_main-default'
                                        : 'text text_type_main-default text_color_inactive'
                                }
                            >
                                Конструктор
                            </p>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/feed"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles['app-header__nav-link']} ${styles['app-header__nav-link--active']} pl-5 pr-5`
                            : `${styles['app-header__nav-link']} pl-5 pr-5`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <ListIcon className="pr-2" type="secondary" />
                            <p
                                className={
                                    isActive
                                        ? 'text text_type_main-default'
                                        : 'text text_type_main-default text_color_inactive'
                                }
                            >
                                Лента заказов
                            </p>
                        </>
                    )}
                </NavLink>
            </nav>

            <div className={styles['app-header__logo']}>
                <Logo />
            </div>

            <div className={styles['app-header__side']}>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles['app-header__nav-link']} ${styles['app-header__nav-link--active']} pl-5 pr-5`
                            : `${styles['app-header__nav-link']} pl-5 pr-5`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <ProfileIcon className="pr-2" type="secondary" />
                            <p
                                className={
                                    isActive
                                        ? 'text text_type_main-default'
                                        : 'text text_type_main-default text_color_inactive'
                                }
                            >
                                Личный кабинет
                            </p>
                        </>
                    )}
                </NavLink>
            </div>
        </header>
    );
};

export default AppHeader;