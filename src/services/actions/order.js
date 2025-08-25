export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export const createOrder = (ingredients) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST });
        try {
            const API_URL = 'https://norma.nomoreparties.space/api/orders';
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredients }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload: data.order,
            });
        } catch (err) {
            console.error(err);
            dispatch({ type: CREATE_ORDER_ERROR });
        }
    };
};

export const clearOrder = () => ({
    type: CLEAR_ORDER,
});