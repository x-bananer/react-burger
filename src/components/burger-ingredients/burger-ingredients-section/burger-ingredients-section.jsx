import PropTypes from 'prop-types';

import styles from './burger-ingredients-section.module.css';

import Modal from '../../modal/modal.jsx';
import IngredientDetails from '../../ingredient-details/ingredient-details.jsx';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDetails, removeDetails } from '../../../services/actions/ingredient.js';

const BurgerIngredientsSection = ({ extraClass, title }) => {
    const dispatch = useDispatch();

    const { items: ingredients } = useSelector(state => state.ingredients);
    const { items: selectedIngredients = [] } = useSelector(state => state.constructor);

    const counts = useMemo(() => {
        const map = new Map();
        selectedIngredients.forEach(item => {
            const currentCount = map.get(item._id) || 0;
            map.set(item._id, currentCount + 1);
        });
        return map;
    }, [selectedIngredients]);
    const getIngredientCount = (ingredient) => counts.get(ingredient._id) || 0;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const {details: selectedIngredient} = useSelector(state => state.ingredient);

    const handleIngredientClick = (ingredient) => {
        dispatch(addDetails(ingredient));
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        dispatch(removeDetails());
    };

    return (
        <>
            <section className={`${styles['burger-ingredients-section']} ${extraClass}`}>
                <h2 className="text text_type_main-medium">
                    {title}
                </h2>
                <ul className={`${styles['burger-ingredients-section__grid']} mt-6`}>
                    {ingredients.map((ingredient, index) => (
                        <li key={`${ingredient._id}_${index}`} className={styles['burger-ingredients-section__card']} onClick={() => handleIngredientClick(ingredient)}>
                            {getIngredientCount(ingredient) > 0 &&
                                <Counter count={getIngredientCount(ingredient)} size="default" extraClass="m-1" />
                            }
                            <img className={styles['burger-ingredients-section__card-image']} alt={ingredient.name} src={ingredient.image} />
                            <p className={`${styles['burger-ingredients-section__sup-title']} text text_type_digits-default mt-1`}>
                                <span className="mr-2">{ingredient.price}</span>
                                <CurrencyIcon type="primary" />
                            </p>
                            <h3 className={`${styles['burger-ingredients-section__title']} text text_type_main-default mt-2`}>
                                {ingredient.name}
                            </h3>
                        </li>
                    ))}
                </ul>
            </section>
            {isModalVisible &&
                <Modal onClose={handleCloseModal}>
                    <IngredientDetails ingredient={selectedIngredient} />
                </Modal>
            }
        </>
    );
};

export default BurgerIngredientsSection;

BurgerIngredientsSection.propTypes = {
    extraClass: PropTypes.string,
    title: PropTypes.string.isRequired,
};