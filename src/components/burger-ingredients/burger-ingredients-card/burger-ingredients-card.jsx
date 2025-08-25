import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients-card.module.css';

const BurgerIngredientsCard = ({ ingredient, onClick, count = 0 }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <li
            ref={dragRef}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className={styles['burger-ingredients-card']}
            onClick={() => onClick(ingredient)}
        >
            { count > 0 &&
                <Counter count={count} size="default" extraClass="m-1" />
            }
            <img className={styles['burger-ingredients-card__image']} alt={ingredient.name} src={ingredient.image} />
            <p className={`${styles['burger-ingredients-card__sup-title']} text text_type_digits-default mt-1`}>
                <span className="mr-2">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </p>
            <h3 className={`${styles['burger-ingredients-card__title']} text text_type_main-default mt-2`}>
                {ingredient.name}
            </h3>
        </li>
    );
};

export default BurgerIngredientsCard;

BurgerIngredientsCard.propTypes = {
    ingredient: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    count: PropTypes.number
};
