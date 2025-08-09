import PropTypes from 'prop-types';

import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsSection from './burger-ingredients-section/burger-ingredients-section.jsx';

import { useState, useMemo, useEffect, useRef } from 'react';

const BurgerIngredients = ({ className, ingredients, selectedIngredients }) => {
    const [activeTab, setActiveTab] = useState('Булки');

    const sectionsRef = useRef({ Булки: null, Соусы: null, Начинки: null });
    const isProgrammaticScroll = useRef(false);

    const buns = useMemo(() => ingredients.filter(i => i.type === 'bun'), [ingredients]);
    const sauces = useMemo(() => ingredients.filter(i => i.type === 'sauce'), [ingredients]);
    const maines = useMemo(() => ingredients.filter(i => i.type === 'main'), [ingredients]);

    useEffect(() => {
        const rootEl = document.querySelector('#burger-ingredients-scroll-container');

        const observer = new IntersectionObserver(
            (entries) => {
                if (!rootEl || isProgrammaticScroll.current) return;

                const rootTop = rootEl.getBoundingClientRect().top;

                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length === 0) return;

                const closest = visible
                    .slice()
                    .sort(
                        (a, b) =>
                            Math.abs(a.target.getBoundingClientRect().top - rootTop) -
                            Math.abs(b.target.getBoundingClientRect().top - rootTop)
                    )[0];

                const section = Object.entries(sectionsRef.current).find(
                    ([, el]) => el === closest.target
                );
                if (section) {
                    setActiveTab(section[0]);
                }
            },
            {
                root: rootEl,
                rootMargin: '0px 0px -85% 0px',
                threshold: 0.01,
            }
        );

        Object.values(sectionsRef.current).forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        const section = sectionsRef.current[tab];
        if (!section) return;
        isProgrammaticScroll.current = true;
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
            isProgrammaticScroll.current = false;
        }, 400);
    };

    return (
        <div className={className}>
            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1>
            <div className={`${styles['burger-ingredients__tabs']} mt-5`}>
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
            <div className={styles['burger-ingredients__scroll-wrap']}>
                <div id="burger-ingredients-scroll-container" className={styles['burger-ingredients__scroll']}>
                    <div ref={el => sectionsRef.current['Булки'] = el}>
                        <BurgerIngredientsSection extraClass="pt-10" title="Булки" ingredients={buns} selectedIngredients={selectedIngredients} />
                    </div>
                    <div ref={el => sectionsRef.current['Соусы'] = el}>
                        <BurgerIngredientsSection extraClass="pt-10" title="Соусы" ingredients={sauces} selectedIngredients={selectedIngredients} />
                    </div>
                    <div ref={el => sectionsRef.current['Начинки'] = el}>
                        <BurgerIngredientsSection extraClass="pt-10" title="Начинки" ingredients={maines} selectedIngredients={selectedIngredients} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BurgerIngredients;

const ingredientType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
});

const selectedIngredientType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
});

BurgerIngredients.propTypes = {
    className: PropTypes.string,
    ingredients: PropTypes.arrayOf(ingredientType).isRequired,
    selectedIngredients: PropTypes.arrayOf(selectedIngredientType).isRequired,
};