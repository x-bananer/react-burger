import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import BurderConstructorDragItem from './burger-constructor-drag-item/burger-constructor-drag-item.jsx';

import { addIngredient, clearConstructor } from '../../services/actions/constructor.js';
import { createOrder, clearOrder } from '../../services/actions/order.js';

import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ className = "" }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useDispatch();
    const { items: selectedIngredients = [] } = useSelector(state => state.burderConstructor);

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop: (ingredient) => {
            dispatch(addIngredient(ingredient));
        }
    });

    const bun = selectedIngredients.find(item => item.type === 'bun');
    const fillings = selectedIngredients.filter(item => item.type !== 'bun');

    const total = useMemo(() => {
        if (!bun) {
            return fillings.reduce((sum, ingredient) => sum + ingredient.price, 0);
        }
        return bun.price * 2 + fillings.reduce((sum, ingredient) => sum + ingredient.price, 0);
    }, [bun, fillings]);


    const handleClickOrder = () => {
        const selectedIngredientIds = [
            bun?._id,
            ...fillings.map(i => i._id),
            bun?._id,
        ];
        dispatch(createOrder(selectedIngredientIds));
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        dispatch(clearOrder());
        dispatch(clearConstructor());
        setIsModalVisible(false);
    };

    return (
        <>
            <div ref={dropRef} className={`${styles['burger-constructor']} ${className}`}>
                {selectedIngredients.length === 0 && ( 
                    <p className={`${styles['burger-constructor__stub']} text text_type_main-medium mt-10 text_color_inactive`}>
                        Перенесите сюда любимые ингредиенты,<br />чтобы собрать бургер для заказа
                    </p>
                )}

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
                                <BurderConstructorDragItem
                                    key={ingredient.uid}
                                    ingredient={ingredient}
                                    index={index}
                                    extraClass={`${styles['burger-constructor__item']} ${index < fillings.length - 1 ? 'mb-4' : ''}`}

                                />
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

                        <Button
                            extraClass="ml-10"
                            type="primary"
                            size="large"
                            htmlType="button"
                            onClick={handleClickOrder}
                        >
                            Оформить заказ
                        </Button>
                    </div>
                }
            </div>
            {isModalVisible &&
                <Modal onClose={handleCloseModal}>
                    <OrderDetails />
                </Modal>
            }
        </>
    );
};

export default BurgerConstructor;

BurgerConstructor.propTypes = {
    className: PropTypes.string
};
