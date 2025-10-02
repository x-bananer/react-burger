import { apiFetch } from '../../utils/api';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';
export const CLEAR_ORDER = 'CLEAR_ORDER';

const API_URL_ORDER_CREATE = '/orders';

export const createOrder = (ingredients) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST });
        try {
            const res = await apiFetch(API_URL_ORDER_CREATE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredients }),
            });

            if (!res.success) {
                throw new Error(res.message);
            }

            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload: res.order,
            });

            return res;
        } catch (err) {
            console.error(err);
            dispatch({ type: CREATE_ORDER_ERROR });
            return err;
        }
    };
};

export const clearOrder = () => ({
    type: CLEAR_ORDER,
});