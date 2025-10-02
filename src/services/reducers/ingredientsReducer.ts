import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
} from "../actions/ingredients";

interface IngredientsState {
	items: any[];
	isLoading: boolean;
	isError: boolean;
}

const initialState: IngredientsState = {
	items: [],
	isLoading: false,
	isError: false,
};

export const ingredientsReducer = (
	state: IngredientsState = initialState,
	action: { type: string; payload?: any }
): IngredientsState => {
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
