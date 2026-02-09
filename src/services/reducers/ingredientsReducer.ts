import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
} from "../constants";
import type { TIngredientsState } from "../types/ingredients";
import type { TIngredientsActions } from '../actions';

const initialState: TIngredientsState = {
	items: [],
	isLoading: false,
	isError: false,
};

export const ingredientsReducer = (
	state: TIngredientsState = initialState,
	action: TIngredientsActions
): TIngredientsState => {
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
