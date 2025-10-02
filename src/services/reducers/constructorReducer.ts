import {
	ADD_INGREDIENT,
	REMOVE_INGREDIENT,
	MOVE_INGREDIENT,
	CLEAR_CONSTRUCTOR,
} from "../actions/constructor";

interface Ingredient {
	_id: string;
	uid: string;
	name: string;
	type: string;
	price: number;
	image: string;
}

interface ConstructorState {
	items: Ingredient[];
}

interface ConstructorAction {
	type: string;
	payload?: any;
}

const initialState: ConstructorState = {
	items: [],
};

export const constructorReducer = (
	state: ConstructorState = initialState,
	action: ConstructorAction
): ConstructorState => {
	switch (action.type) {
		case ADD_INGREDIENT: {
			const ingredient = action.payload;

			if (ingredient.type === "bun") {
				const withoutBun = state.items.filter(
					(i: Ingredient) => i.type !== "bun"
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
					(ingredient: Ingredient) =>
						ingredient.uid !== action.payload
				),
			};
		}
		case MOVE_INGREDIENT: {
			const { dragIndex, hoverIndex } = action.payload;

			const bun = state.items.find((i: Ingredient) => i.type === "bun");
			const fillings = state.items.filter(
				(i: Ingredient) => i.type !== "bun"
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
