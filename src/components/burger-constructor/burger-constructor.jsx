import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';

import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BurgerConstructor = ({ className }) => {
    const dispatch = useDispatch();

    const { items: selectedIngredients = [] } = useSelector(state => state.constructor);

    const bun = selectedIngredients.find(item => item.type === 'bun');
    const fillings = selectedIngredients.filter(ingredient => ingredient.type !== 'bun');
    const total = useMemo(() => {
        if (!bun) {
            return fillings.reduce((sum, ingredient) => sum + ingredient.price, 0);
        }
        return bun.price * 2 + fillings.reduce((sum, ingredient) => sum + ingredient.price, 0);
    }, [bun, fillings]);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const onDeleteIngredient = (uid) => {
        dispatch(removeIngredient(uid));
    };

    const handleClickOrder = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
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