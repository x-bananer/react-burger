import { v4 as uuidv4 } from 'uuid';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions/constructor.js';

const initialState = {
    items: []
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            const ingredient = {
                ...action.payload,
                uid: uuidv4()
            };

            if (ingredient.type === 'bun') {
                const withoutBun = state.items.filter(i => i.type !== 'bun');
                return {
                    ...state,
                    items: [...withoutBun, ingredient]
                };
            }

            return {
                ...state,
                items: [...state.items, ingredient]
            };
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                items: state.items.filter(ingredient => ingredient.uid !== action.payload)
            };
        }
        default: {
            return state;
        }
    }
};