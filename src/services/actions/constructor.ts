import { v4 as uuidv4 } from "uuid";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

export type TIngredient = {
	_id: string;
	uid?: string;
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

export const addIngredient = (
	ingredient: TIngredient
): { type: typeof ADD_INGREDIENT; payload: TIngredient } => ({
	type: ADD_INGREDIENT,
	payload: {
		...ingredient,
		uid: uuidv4(),
	},
});

export const removeIngredient = (
	uid: string
): { type: typeof REMOVE_INGREDIENT; payload: string } => ({
	type: REMOVE_INGREDIENT,
	payload: uid,
});

export const moveIngredient = (
	dragIndex: number,
	hoverIndex: number
): {
	type: typeof MOVE_INGREDIENT;
	payload: { dragIndex: number; hoverIndex: number };
} => ({
	type: MOVE_INGREDIENT,
	payload: { dragIndex, hoverIndex },
});

export const clearConstructor = (): { type: typeof CLEAR_CONSTRUCTOR } => ({
	type: CLEAR_CONSTRUCTOR,
});
