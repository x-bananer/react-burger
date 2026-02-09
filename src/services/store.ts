import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { rootReducer } from "./reducers";
import { socketMiddleware } from './middleware'

const API_WS_URL = "wss://norma.education-services.ru/orders/all";

// @ts-ignore
const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(
			thunk,
			socketMiddleware(API_WS_URL)
		)
	)
);

export default store;
