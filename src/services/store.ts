import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";

import { constructorReducer } from "./reducers/constructorReducer";
import { ingredientReducer } from "./reducers/ingredientReducer";
import { ingredientsReducer } from "./reducers/ingredientsReducer";
import { orderReducer } from "./reducers/orderReducer";
import { authReducer } from "./reducers/authReducer";

const rootReducer = combineReducers({
	burderConstructor: constructorReducer,
	ingredient: ingredientReducer,
	ingredients: ingredientsReducer,
	order: orderReducer,
	auth: authReducer,
});

// @ts-ignore
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
