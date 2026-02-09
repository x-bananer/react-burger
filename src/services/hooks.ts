import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import type { RootState } from "./reducers";
import type { AppDispatch } from "./types";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();
