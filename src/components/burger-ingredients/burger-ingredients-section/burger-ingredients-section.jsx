import PropTypes from 'prop-types';

import styles from './burger-ingredients-section.module.css';

import Modal from '../../modal/modal.jsx';
import IngredientDetails from '../../ingredient-details/ingredient-details.jsx';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card.jsx';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDetails, removeDetails } from '../../../services/actions/ingredient.js';

const BurgerIngredientsSection = ({ extraClass, title, ingredients }) => {
    const dispatch = useDispatch();

    const { items: selectedIngredients = [] } = useSelector(state => state.burderConstructor);

    const counts = useMemo(() => {
        const map = new Map();
        selectedIngredients.forEach(item => {
            const currentCount = map.get(item._id) || 0;
            map.set(item._id, currentCount + 1);
        });
        return map;
    }, [selectedIngredients]);

    const getIngredientCount = (ingredient) => {
        if (ingredient.type === 'bun' && counts.get(ingredient._id)) {
            return 2;
        }
        return counts.get(ingredient._id) || 0;
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const { details: selectedIngredient } = useSelector(state => state.ingredient);

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
                        <BurgerIngredientsCard
                            key={`${ingredient._id}_${index}`}
                            ingredient={ingredient}
                            onClick={handleIngredientClick}
                            count={getIngredientCount(ingredient)}
                        />
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