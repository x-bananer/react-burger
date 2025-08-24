import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR } from '../actions/ingredients';

const initialState = {
    items: [],
    isLoading: false,
    isError: false,
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                isError: false,
                isLoading: true,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                items: action.payload,
                isLoading: false,
                isError: false,
            };
        }
        case GET_INGREDIENTS_ERROR: {
            return {
                ...state,
                items: [],
                isLoading: false,
                isError: true,
            };
        }
        default: {
            return state;
        }
    }
};