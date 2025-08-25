import { ADD_DETAILS, REMOVE_DETAILS } from '../actions/ingredient';

const initialState = {
    details: null
};

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DETAILS: {
            return {
                ...state,
                details: action.payload
            }
        }
        case REMOVE_DETAILS: {
            return {
                ...state,
                details: null
            }
        }
        default: {
            return state;
        }
    }
};