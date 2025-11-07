import type { ThunkDispatch } from 'redux-thunk';
import type { ThunkAction } from 'redux-thunk';
import type { Dispatch } from 'redux';
import type { RootState } from '../reducers';

import type {
	TAuthActions,
	TOrderActions,
	TConstructorActions,
	TIngredientActions,
	TIngredientsActions,
	TWSActions,
} from "../actions";

export type TApplicationActions =
	| TAuthActions
	| TOrderActions
	| TConstructorActions
	| TIngredientActions
    | TIngredientsActions
	| TWSActions;

export type AppThunk<TReturn = void> = ThunkAction<
  TReturn,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch =
  ThunkDispatch<RootState, unknown, TApplicationActions> &
  Dispatch<TApplicationActions>;
export type { RootState };