import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';

import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurderConstructorDragItem from './burger-constructor-drag-item/burger-constructor-drag-item.jsx';

import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addIngredient, removeIngredient } from '../../services/actions/constructor.js';

const BurgerConstructor = ({ className }) => {
    const dispatch = useDispatch();
    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop: (ingredient) => {
            dispatch(addIngredient(ingredient));
        }
    });

    const { items: selectedIngredients = [] } = useSelector(state => state.burderConstructor);

    const bun = selectedIngredients.find(item => item.type === 'bun');
    const fillings = selectedIngredients.filter(ingredient => ingredient.type !== 'bun');

    const total = useMemo(() => {
        if (!bun) {
            return fillings.reduce((sum, ingredient) => sum + ingredient.price, 0);
        }
        return bun.price * 2 + fillings.reduce((sum, ingredient) => sum + ingredient.price, 0);
    }, [bun, fillings]);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleClickOrder = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div ref={dropRef} className={`${styles['burger-constructor']} ${className}`}>
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
                        <Button extraClass="ml-10" htmlType="button" type="primary" size="large" onClick={handleClickOrder}>
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
    className: PropTypes.string,
};