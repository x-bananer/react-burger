import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import {thunk} from 'redux-thunk';

import { constructorReducer } from './reducers/constructorReducer';
import { ingredientReducer } from './reducers/ingredientReducer';
import { ingredientsReducer } from './reducers/ingredientsReducer';
import { orderReducer } from './reducers/orderReducer';

const rootReducer = combineReducers({
	constructor: constructorReducer,
	ingredient: ingredientReducer,
	ingredients: ingredientsReducer,
	order: orderReducer,
});

const store = createStore(rootReducer, composeWithDevTools(
	applyMiddleware(thunk)
));

export default store;