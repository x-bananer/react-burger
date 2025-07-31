import './burger-constructor.css';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ className, selectedIngredients, onDeleteIngredient }) => {
    const bun = selectedIngredients.find(item => item.type === 'bun');
    const fillings = selectedIngredients
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => item.type !== 'bun');
    const total = selectedIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);

    return (
        <div className={`burger-constructor ${className}`}>
            {bun && (
                <ConstructorElement
                    extraClass="mb-4 burger-constructor__item burger-constructor__item--offset"
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            )}

            <div className="burger-constructor__scroll-wrap">
                <div className="burger-constructor__scroll">
                    {fillings.map(({ item, index }, innerIndex) => (
                        <div key={innerIndex}>
                            <DragIcon type="primary" className="mr-2" />
                            <ConstructorElement
                                extraClass={`burger-constructor__item ${innerIndex < fillings.length - 1 ? 'mb-4' : ''}`}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                handleClose={() => onDeleteIngredient(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {bun && (
                <ConstructorElement
                    extraClass="burger-constructor__item mt-4 burger-constructor__item--offset"
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            )}
            {
                total > 0 &&
                <div className="burger-constructor__footer mt-10">
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