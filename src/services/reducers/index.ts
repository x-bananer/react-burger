import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { constructorReducer } from "./constructorReducer";
import { ingredientReducer } from "./ingredientReducer";
import { ingredientsReducer } from "./ingredientsReducer";
import { orderReducer } from "./orderReducer";

export const rootReducer = combineReducers({
	burderConstructor: constructorReducer,
	ingredient: ingredientReducer,
	ingredients: ingredientsReducer,
	order: orderReducer,
	auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
