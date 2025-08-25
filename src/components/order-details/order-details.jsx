import styles from '../order-details/order-details.module.css';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
    const { order, isLoading, isError } = useSelector(state => state.order);

    return (
        <div className={styles['order-details']}>
            <h1 className="text text_type_digits-large">
                {order?.number || ''}
            </h1>

            {isLoading && (
                <p className="text text_type_main-default text_color_inactive">
                    Загрузка...
                </p>
            )}

            {isError && (
                <p className="text text_type_main-default text_color_inactive">
                    Что-то пошло не так, попробуйте повторить заказ
                </p>
            )}

            {!isLoading && !isError && (
                <>
                    <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
                    <div className={`${styles['order-details__icon-wrapper']} mt-15 mb-15`}>
                        <CheckMarkIcon type="primary" />
                    </div>
                    <p className="mb-2 text_type_main-default">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default text_color_inactive">
                        Дождитесь готовности на орбитальной станции
                    </p>
                </>
            )}
        </div>
    );
};

export default OrderDetails;