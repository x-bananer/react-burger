import './burger-ingredients-section.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredientsSection = ({extraClass, title, ingredients, selectedIngredients, onIngredientClick}) => {
    const getIngredientCount = (ingredient) => {
        return selectedIngredients.filter(item => item._id === ingredient._id).length;
    };

    return (
        <section className={`burger-ingredients-section ${extraClass}`}>
            <h2 className="text text_type_main-medium">
                {title}
            </h2>
            <ul className="burger-ingredients-section__grid mt-6">
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="burger-ingredients-section__card" onClick={() => onIngredientClick(ingredient)}>
                        {getIngredientCount(ingredient) > 0 &&
                            <Counter count={getIngredientCount(ingredient)} size="default" extraClass="m-1" />
                        }
                        <img className="burger-ingredients-section__card-image" alt={ingredient.name} src={ingredient.image} />
                        <p className="burger-ingredients-section__sup-title text text_type_digits-default mt-1">
                            <span className="mr-2">{ingredient.price}</span>
                            <CurrencyIcon type="primary" />
                        </p>
                        <h3 className="burger-ingredients-section__title text text_type_main-default mt-2">
                            {ingredient.name}
                        </h3>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default BurgerIngredientsSection;