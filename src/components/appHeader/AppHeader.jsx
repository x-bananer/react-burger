import './app-header.css';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <header className="app-header p-4">
            <nav className="app-header__nav">
                <Button htmlType="button" type="secondary" size="medium" extraClass="app-header__button app-header__button--active pl-5 pr-5 mr-2">
                    <BurgerIcon className="pr-2" type="secondary" />
                    Конструктор
                </Button>
                <Button htmlType="button" type="secondary" size="medium" extraClass="app-header__button pl-5 pr-5">
                    <ListIcon className="pr-2" type="secondary" />
                    Лента заказов
                </Button>
            </nav>
            <div className="app-header__logo">
                <Logo />
            </div>
            <div className="app-header__side">
                <Button htmlType="button" type="secondary" size="medium" extraClass="app-header__button pl-5 pr-5">
                    <ProfileIcon className="pr-2" type="secondary" />
                    Личный кабинет
                </Button>
            </div>
        </header>
    )
};

export default AppHeader;