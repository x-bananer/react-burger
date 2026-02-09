import type { TAuthState } from '../types/auth';
import type { TAuthActions } from '../actions';

import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_ERROR,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_ERROR,
	AUTH_CHECKED,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_ERROR,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_ERROR,
} from "../constants";

const initialState: TAuthState = {
	user: null,
	isLoggedIn: false,
	isLoading: false,
	isError: false,
	isAuthChecked: false,
	canResetPassword: false,
};

export const authReducer = (
	state: TAuthState = initialState,
	action: TAuthActions
): TAuthState => {
	switch (action.type) {
		case LOGIN_REQUEST:
		case REGISTER_REQUEST:
		case GET_USER_REQUEST:
		case UPDATE_USER_REQUEST:
		case LOGOUT_REQUEST:
		case FORGOT_PASSWORD_REQUEST:
		case RESET_PASSWORD_REQUEST:
			return {
				...state,
				isLoading: true,
				isError: false,
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
		case GET_USER_SUCCESS:
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
				isLoggedIn: true,
				isLoading: false,
				isError: false,
			};
		case LOGIN_ERROR:
		case REGISTER_ERROR:
		case GET_USER_ERROR:
		case UPDATE_USER_ERROR:
		case LOGOUT_ERROR:
		case FORGOT_PASSWORD_ERROR:
		case RESET_PASSWORD_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				canResetPassword: true,
			};
		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				canResetPassword: false,
			};
		case LOGOUT_SUCCESS:
			return {
				user: null,
				isLoggedIn: false,
				isLoading: false,
				isError: false,
				isAuthChecked: true,
				canResetPassword: false,
			};
		case AUTH_CHECKED:
			return {
				...state,
				isAuthChecked: true,
			};
		default:
			return state;
	}
};
