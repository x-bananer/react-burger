export type TOrder = {
	_id: string;
	number: number;
	status: string;
	price: number;
	name: string;
	ingredients: {
		_id: string;
		name: string;
		type: string;
		proteins: number;
		fat: number;
		carbohydrates: number;
		calories: number;
		price: number;
		image: string;
		image_mobile: string;
		image_large: string;
		__v?: number;
		uid?: string;
	}[];
	owner: {
		name: string;
		email: string;
		createdAt: string;
		updatedAt: string;
	};
	createdAt: string;
	updatedAt: string;
};

import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_ERROR,
	CLEAR_ORDER,
} from "../actions/order.ts";

interface OrderState {
	order: TOrder | null;
	isLoading: boolean;
	isError: boolean;
}

const initialState: OrderState = {
	order: null,
	isLoading: false,
	isError: false,
};

export const orderReducer = (
	state: OrderState = initialState,
	action: { type: string; payload?: any }
): OrderState => {
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
