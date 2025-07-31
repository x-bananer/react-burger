import './burger-ingredients.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { useState } from 'react';
import { useEffect, useRef } from 'react';

const BurgerIngredients = ({ className, ingredients }) => {
    const [activeTab, setActiveTab] = useState('Булки');
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const sectionsRef = useRef({ Булки: null, Соусы: null, Начинки: null });

    const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
    const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');
    const maines = ingredients.filter(ingredient => ingredient.type === 'main');

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const section = Object.entries(sectionsRef.current).find(
                            ([_, el]) => el === entry.target
                        );
                        if (section) {
                            setActiveTab(section[0]);
                        }
                    }
                });
            },
            {
                root: document.querySelector('.burger-ingredients__scroll'),
                rootMargin: '-0% 0px -85% 0px',
                threshold: 0
            }
        );

        Object.values(sectionsRef.current).forEach(section => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const getIngredientCount = (ingredient) => {
        return selectedIngredients.filter(item => item._id === ingredient._id).length;
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        const section = sectionsRef.current[tab];
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleCardClick = (ingredient) => {
        if (ingredient.type === 'bun') {
            const selectedBun = selectedIngredients.find(item => item.type === 'bun');

            if (selectedBun) {
                if (selectedBun._id === ingredient._id) return;

                setSelectedIngredients(prev =>
                    [...prev.filter(item => item.type !== 'bun'), ingredient]
                );
            } else {
                setSelectedIngredients(prev => [...prev, ingredient]);
            }
        } else {
            setSelectedIngredients(prev => [...prev, ingredient]);
        }
    };

    return (
        <div className={className}>
            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1>
            <div className="burger-ingredients__tabs mt-5">
                <Tab value="Булки" active={activeTab === 'Булки'} onClick={handleTabClick}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={activeTab === 'Соусы'} onClick={handleTabClick}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={activeTab === 'Начинки'} onClick={handleTabClick}>
                    Начинки
                </Tab>
            </div>
            <div className="burger-ingredients__scroll-wrap">
                <div className="burger-ingredients__scroll">
                    <section className="burger-ingredients__section pt-10" ref={el => sectionsRef.current['Булки'] = el}>
                        <h2 className="text text_type_main-medium">
                            Булки
                        </h2>
                        <ul className="burger-ingredients__grid mt-6">
                            {buns.map((bun, index) => (
                                <li key={index} className="burger-ingredients__card" onClick={() => handleCardClick(bun)}>
                                    {getIngredientCount(bun) > 0 &&
                                        <Counter count={getIngredientCount(bun)} size="default" extraClass="m-1" />
                                    }
                                    <img className="burger-ingredients__card-image" alt={bun.name} src={bun.image} />
                                    <p className="burger-ingredients__sup-title text text_type_digits-default mt-1">
                                        <span className="mr-2">{bun.price}</span>
                                        <CurrencyIcon type="primary" />
                                    </p>
                                    <h3 className="burger-ingredients__title text text_type_main-default mt-2">
                                        {bun.name}
                                    </h3>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="burger-ingredients__section pt-10" ref={el => sectionsRef.current['Соусы'] = el}>
                        <h2 className="text text_type_main-medium">
                            Соусы
                        </h2>
                        <ul className="burger-ingredients__grid mt-6">
                            {sauces.map((sauce, index) => (
                                <li key={index} className="burger-ingredients__card" onClick={() => handleCardClick(sauce)}>
                                    {getIngredientCount(sauce) > 0 &&
                                        <Counter count={getIngredientCount(sauce)} size="default" extraClass="m-1" />
                                    }
                                    <img className="burger-ingredients__card-image" alt={sauce.name} src={sauce.image} />
                                    <p className="burger-ingredients__sup-title text text_type_digits-default mt-1">
                                        <span className="mr-2">{sauce.price}</span>
                                        <CurrencyIcon type="primary" />
                                    </p>
                                    <h3 className="burger-ingredients__title text text_type_main-default mt-2">
                                        {sauce.name}
                                    </h3>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="burger-ingredients__section pt-10" ref={el => sectionsRef.current['Начинки'] = el}>
                        <h2 className="text text_type_main-medium">
                            Начинки
                        </h2>
                        <ul className="burger-ingredients__grid mt-6">
                            {maines.map((main, index) => (
                                <li key={index} className="burger-ingredients__card" onClick={() => handleCardClick(main)}>
                                    {
                                        getIngredientCount(main) > 0 &&
                                        <Counter count={getIngredientCount(main)} size="default" extraClass="m-1" />
                                    }
                                    <img className="burger-ingredients__card-image" alt={main.name} src={main.image} />
                                    <p className="burger-ingredients__sup-title text text_type_digits-default mt-1">
                                        <span className="mr-2">{main.price}</span>
                                        <CurrencyIcon type="primary" />
                                    </p>
                                    <h3 className="burger-ingredients__title text text_type_main-default mt-2">
                                        {main.name}
                                    </h3>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
};

export default BurgerIngredients;