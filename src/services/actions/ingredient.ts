import type { TIngredient } from "../types/ingredient";
import { ADD_DETAILS, REMOVE_DETAILS } from "../constants";

export interface IAddDetailsAction {
	readonly type: typeof ADD_DETAILS;
	readonly payload: TIngredient;
}

export interface IRemoveDetailsAction {
	readonly type: typeof REMOVE_DETAILS;
}

export type TIngredientActions = IAddDetailsAction | IRemoveDetailsAction;

export const addDetails = (ingredient: TIngredient): IAddDetailsAction => ({
	type: ADD_DETAILS,
	payload: ingredient,
});

export const removeDetails = (): IRemoveDetailsAction => ({
	type: REMOVE_DETAILS,
});
