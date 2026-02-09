import { ADD_DETAILS, REMOVE_DETAILS } from "../constants";
import type { TIngredientState } from "../types/ingredient";
import type { TIngredientActions } from '../actions';

const initialState: TIngredientState = {
	details: null,
};

export const ingredientReducer = (
	state: TIngredientState = initialState,
	action: TIngredientActions
): TIngredientState => {
	switch (action.type) {
		case ADD_DETAILS: {
			return {
				...state,
				details: action.payload,
			};
		}
		case REMOVE_DETAILS: {
			return {
				...state,
				details: null,
			};
		}
		default: {
			return state;
		}
	}
};
