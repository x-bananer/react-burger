export type TIngredient = {
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
};

type TIngredientsResponse = {
	success: boolean;
	data: TIngredient[];
};

import { apiFetch } from "../../utils/api.ts";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export const getIngredients = () => {
	return async (dispatch: any) => {
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
