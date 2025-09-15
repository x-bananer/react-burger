import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ ingredient: propIngredient, isPage }) => {
    const { id } = useParams();
    const ingredient = propIngredient || useSelector(state =>
        state.ingredients.items.find(i => i._id === id)
    );

    if (!ingredient) return <p>Ингредиент не найден</p>;

    return (
        <div className={styles['ingredient-details']}>
            <div
                className={`${styles['ingredient-details__header']} ${isPage ? styles['ingredient-details__header--center'] : ''
                    }`}
            >
                <h1 className="text text_type_main-large">
                    Детали ингредиента
                </h1>
            </div>
            <div className={styles['ingredient-details__content-wrap']}>
                <div className={styles['ingredient-details__content']}>
                    <img className={styles['ingredient-details__image']} src={ingredient.image_large} alt={ingredient.name} />
                    <p className="text text_type_main-medium mt-4 mb-8">
                        {ingredient.name}
                    </p>
                    <div className={styles['ingredient-details__grid']}>
                        <div>
                            <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
                            <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                        </div>
                        <div>
                            <p className="text text_type_main-default text_color_inactive mb-2">Белки,г</p>
                            <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                        </div>
                        <div>
                            <p className="text text_type_main-default text_color_inactive mb-2">Жиры,г</p>
                            <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                        </div>
                        <div>
                            <p className="text text_type_main-default text_color_inactive mb-2">Углеводы,г</p>
                            <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


IngredientDetails.propTypes = {
    ingredient: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        image_large: PropTypes.string,
        calories: PropTypes.number,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
    }),
    isPage: PropTypes.bool,
};

export default IngredientDetails;
