import type { AppDispatch } from "../types";
import { apiFetch } from "../../utils/api.ts";
import type { TIngredient } from "../types/ingredient";
import type { TIngredientsResponse } from "../types/ingredients";
import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_ERROR,
} from "../constants";

export interface IGetIngredientsRequestAction {
	readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
	readonly type: typeof GET_INGREDIENTS_SUCCESS;
	readonly payload: TIngredient[];
}

export interface IGetIngredientsErrorAction {
	readonly type: typeof GET_INGREDIENTS_ERROR;
}

export type TIngredientsActions =
	| IGetIngredientsRequestAction
	| IGetIngredientsSuccessAction
	| IGetIngredientsErrorAction;

export const getIngredients = () => {
	return async (dispatch: AppDispatch) => {
		dispatch({ type: GET_INGREDIENTS_REQUEST });
		try {
			const data = await apiFetch<TIngredientsResponse>("/ingredients");
			dispatch({
				type: GET_INGREDIENTS_SUCCESS,
				payload: data.data,
			});
		} catch (err) {
			console.error(err);
			dispatch({ type: GET_INGREDIENTS_ERROR });
		}
	};
};
