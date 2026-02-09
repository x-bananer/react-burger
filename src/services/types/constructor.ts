import type { TIngredient } from "./ingredient";

export type TConstructorIngredient = TIngredient & {
	uid: string;
};

export type TConstructorState = {
	items: TConstructorIngredient[];
};
