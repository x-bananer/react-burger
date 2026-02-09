import { v4 as uuidv4 } from "uuid";
import type { TIngredient } from "../types/ingredient";
import type { TConstructorIngredient } from "../types/constructor";

import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	MOVE_INGREDIENT,
	CLEAR_CONSTRUCTOR,
} from "../constants";

export interface IAddIngredientAction {
	readonly type: typeof ADD_INGREDIENT;
	readonly payload: TConstructorIngredient;
}

export interface IMoveIngredientAction {
	readonly type: typeof MOVE_INGREDIENT;
	readonly payload: { dragIndex: number; hoverIndex: number };
}

export interface IRemoveIngredientAction {
	readonly type: typeof REMOVE_INGREDIENT;
	readonly payload: string;
}

export interface IClearConstructorAction {
	readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TConstructorActions =
	| IAddIngredientAction
	| IMoveIngredientAction
	| IRemoveIngredientAction
	| IClearConstructorAction;

export const addIngredient = (
	ingredient: TIngredient
): IAddIngredientAction => ({
	type: ADD_INGREDIENT,
	payload: {
		...ingredient,
		uid: uuidv4(),
	},
});

export const removeIngredient = (uid: string): IRemoveIngredientAction => ({
	type: REMOVE_INGREDIENT,
	payload: uid,
});

export const moveIngredient = (
	dragIndex: number,
	hoverIndex: number
): IMoveIngredientAction => ({
	type: MOVE_INGREDIENT,
	payload: { dragIndex, hoverIndex },
});

export const clearConstructor = (): IClearConstructorAction => ({
	type: CLEAR_CONSTRUCTOR,
});
