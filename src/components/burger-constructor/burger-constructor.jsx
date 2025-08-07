import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ className, selectedIngredients, onDeleteIngredient }) => {
    const bun = selectedIngredients.find(item => item.type === 'bun');
    const fillings = selectedIngredients.filter(ingredient => ingredient.type !== 'bun');
    const total = selectedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);

    return (
        <div className={`${styles['burger-constructor']} ${className}`}>
            {bun &&
                <ConstructorElement
                    extraClass={`mb-4 ${styles['burger-constructor__item']} ${styles['burger-constructor__item--offset']}`}
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            }

            {fillings.length > 0 &&
                <div className={styles['burger-constructor__scroll-wrap']}>
                    <div className={styles['burger-constructor__scroll']}>
                        {fillings.map((ingredient, index) => (
                            <div key={ingredient.uid}>
                                <DragIcon type="primary" className="mr-2" />
                                <ConstructorElement
                                    extraClass={`${styles['burger-constructor__item']} ${index < fillings.length - 1 ? 'mb-4' : ''}`}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    handleClose={() => onDeleteIngredient(ingredient.uid)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            }

            {bun &&
                <ConstructorElement
                    extraClass={`${styles['burger-constructor__item']} mt-4 ${styles['burger-constructor__item--offset']}`}
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            }

            {total > 0 &&
                <div className={`${styles['burger-constructor__footer']} mt-10`}>
                    <span className="text text_type_main-large mr-4">
                        {total}
                    </span>
                    <CurrencyIcon type="primary" />
                    <Button extraClass="ml-10" htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            }
        </div>
    );
};

export default BurgerConstructor;

const ingredientType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
});

BurgerConstructor.propTypes = {
    className: PropTypes.string,
    selectedIngredients: PropTypes.arrayOf(ingredientType).isRequired,
    onDeleteIngredient: PropTypes.func.isRequired,
};