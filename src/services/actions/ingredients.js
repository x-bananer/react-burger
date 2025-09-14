export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const getIngredients = () => {
    return async (dispatch) => {
        dispatch({ type: GET_INGREDIENTS_REQUEST });
        try {
            const API_URL = 'https://norma.nomoreparties.space/api/ingredients';
            const res = await fetch(API_URL);

            if (!res.ok) {
                throw new Error(res);
            }
            
            const data = await res.json();
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                payload: data.data
            });
        } catch (err) {
            console.log(err);
            dispatch({ type: GET_INGREDIENTS_ERROR });
        }
    };
};

