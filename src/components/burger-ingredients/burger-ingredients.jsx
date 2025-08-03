import PropTypes from 'prop-types';

import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsSection from './burger-ingredients-section/burger-ingredients-section.jsx';

import { useState } from 'react';
import { useEffect, useRef } from 'react';

const BurgerIngredients = ({ className, ingredients, selectedIngredients, onSelectIngredient }) => {
    const [activeTab, setActiveTab] = useState('Булки');

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
                root: document.querySelector('#burger-ingredients-scroll-container'),
                rootMargin: '-0% 0px -85% 0px',
                threshold: 0
            }
        );

        Object.values(sectionsRef.current).forEach(section => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        const section = sectionsRef.current[tab];
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleIngredientClick = (ingredient) => {
        onSelectIngredient(ingredient);
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
                        <BurgerIngredientsSection extraClass="pt-10" title="Булки" ingredients={buns} selectedIngredients={selectedIngredients} onIngredientClick={handleIngredientClick} />
                    </div>
                    <div ref={el => sectionsRef.current['Соусы'] = el}>
                        <BurgerIngredientsSection extraClass="pt-10" title="Соусы" ingredients={sauces} selectedIngredients={selectedIngredients} onIngredientClick={handleIngredientClick} />
                    </div>
                    <div ref={el => sectionsRef.current['Начинки'] = el}>
                        <BurgerIngredientsSection extraClass="pt-10" title="Начинки" ingredients={maines} selectedIngredients={selectedIngredients} onIngredientClick={handleIngredientClick} />
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
	onSelectIngredient: PropTypes.func.isRequired,
};