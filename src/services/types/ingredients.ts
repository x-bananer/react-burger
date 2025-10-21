import type { TIngredient } from "./ingredient";

export type TIngredientsResponse = {
    success: boolean;
    data: TIngredient[];
};

export type TIngredientsState = {
	items: TIngredient[];
	isLoading: boolean;
	isError: boolean;
};
