import { apiFetch } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const getIngredients = () => {
    return async (dispatch) => {
        dispatch({ type: GET_INGREDIENTS_REQUEST });
        try {
            const data = await apiFetch('https://norma.nomoreparties.space/api/ingredients');
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                payload: data.data
            });
        } catch (err) {
            console.error(err);
            dispatch({ type: GET_INGREDIENTS_ERROR });
        }
    };
};
