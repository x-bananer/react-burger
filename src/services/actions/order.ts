import { apiFetch } from "../../utils/api";
import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_ERROR,
	CLEAR_ORDER,
} from "../constants";
import type { TOrder } from "../types/order";
import type { AppDispatch } from "../types";

const API_URL_ORDER_CREATE = "/orders";

export interface ICreateOrderRequestAction {
	readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccessAction {
	readonly type: typeof CREATE_ORDER_SUCCESS;
	readonly payload: TOrder;
}

export interface ICreateOrderErrorAction {
	readonly type: typeof CREATE_ORDER_ERROR;
}

export interface IClearOrderAction {
	readonly type: typeof CLEAR_ORDER;
}

export type TOrderActions =
	| ICreateOrderRequestAction
	| ICreateOrderSuccessAction
	| ICreateOrderErrorAction
	| IClearOrderAction;

export const createOrder = (ingredients: string[]) => {
	return async (dispatch: AppDispatch) => {
		dispatch({ type: CREATE_ORDER_REQUEST });
		try {
			const res = await apiFetch<{ success: boolean; order: TOrder }>(
				API_URL_ORDER_CREATE,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ ingredients }),
				}
			);

			if (!res.success) {
				throw new Error("Order creation failed");
			}

			dispatch({
				type: CREATE_ORDER_SUCCESS,
				payload: res.order,
			});

			return res;
		} catch (err) {
			console.error(err);
			dispatch({ type: CREATE_ORDER_ERROR });
			return err;
		}
	};
};

export const clearOrder = (): IClearOrderAction => ({
	type: CLEAR_ORDER,
});
