import type { TOrderState } from "../types/order";
import type { TOrderActions } from '../actions';

import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_ERROR,
	CLEAR_ORDER
} from "../constants";

const initialState: TOrderState = {
	order: null,
	isLoading: false,
	isError: false,
};

export const orderReducer = (
	state: TOrderState = initialState,
	action: TOrderActions
): TOrderState => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST: {
			return {
				...state,
				isError: false,
				isLoading: true,
			};
		}
		case CREATE_ORDER_SUCCESS: {
			return {
				...state,
				order: action.payload,
				isLoading: false,
				isError: false,
			};
		}
		case CREATE_ORDER_ERROR: {
			return {
				...state,
				order: null,
				isLoading: false,
				isError: true,
			};
		}
		case CLEAR_ORDER: {
			return {
				...state,
				order: null,
				isLoading: false,
				isError: false,
			};
		}
		default:
			return state;
	}
};
