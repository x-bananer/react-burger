import type {
	TConstructorIngredient,
	TConstructorState,
} from "../types/constructor";
import type { TConstructorActions } from '../actions';

import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	MOVE_INGREDIENT,
	CLEAR_CONSTRUCTOR,
} from "../constants";

const initialState: TConstructorState = {
	items: [],
};

export const constructorReducer = (
	state: TConstructorState = initialState,
	action: TConstructorActions
): TConstructorState => {
	switch (action.type) {
		case ADD_INGREDIENT: {
			const ingredient = action.payload;

			if (ingredient.type === "bun") {
				const withoutBun = state.items.filter(
					(i: TConstructorIngredient) => i.type !== "bun"
				);
				return {
					...state,
					items: [...withoutBun, ingredient],
				};
			}

			return {
				...state,
				items: [...state.items, ingredient],
			};
		}
		case REMOVE_INGREDIENT: {
			return {
				...state,
				items: state.items.filter(
					(ingredient: TConstructorIngredient) =>
						ingredient.uid !== action.payload
				),
			};
		}
		case MOVE_INGREDIENT: {
			const { dragIndex, hoverIndex } = action.payload;

			const bun = state.items.find(
				(i: TConstructorIngredient) => i.type === "bun"
			);
			const fillings = state.items.filter(
				(i: TConstructorIngredient) => i.type !== "bun"
			);

			const updatedFillings = [...fillings];
			const [removed] = updatedFillings.splice(dragIndex, 1);
			updatedFillings.splice(hoverIndex, 0, removed);

			return {
				...state,
				items: bun ? [bun, ...updatedFillings] : updatedFillings,
			};
		}
		case CLEAR_CONSTRUCTOR: {
			return {
				...state,
				items: [],
			};
		}
		default: {
			return state;
		}
	}
};
