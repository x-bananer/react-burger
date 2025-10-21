import { apiFetch } from "../../utils/api.ts";
import type { AppDispatch } from "../types";
import type {
	TDefaultResponse,
	TUserResponse,
	TAuthResponse,
} from "../types/auth.ts";
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

const API_URL_LOGIN = "/auth/login";
const API_URL_REGISTER = "/auth/register";
const API_URL_GET_USER = "/auth/user";
const API_URL_UPDATE_USER = "/auth/user";
const API_URL_LOGOUT = "/auth/logout";
const API_FORGOT_PASSWORD_URL = "/password-reset";
const API_RESET_PASSWORD_URL = "/password-reset/reset";

export interface ILoginRequestAction {
	readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccessAction {
	readonly type: typeof LOGIN_SUCCESS;
	readonly payload: { email: string; name: string };
}
export interface ILoginErrorAction {
	readonly type: typeof LOGIN_ERROR;
}

export interface IRegisterRequestAction {
	readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccessAction {
	readonly type: typeof REGISTER_SUCCESS;
	readonly payload: { email: string; name: string };
}
export interface IRegisterErrorAction {
	readonly type: typeof REGISTER_ERROR;
}

export interface IGetUserRequestAction {
	readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccessAction {
	readonly type: typeof GET_USER_SUCCESS;
	readonly payload: { email: string; name: string };
}
export interface IGetUserErrorAction {
	readonly type: typeof GET_USER_ERROR;
}

export interface IUpdateUserRequestAction {
	readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccessAction {
	readonly type: typeof UPDATE_USER_SUCCESS;
	readonly payload: { email: string; name: string };
}
export interface IUpdateUserErrorAction {
	readonly type: typeof UPDATE_USER_ERROR;
}

export interface ILogoutRequestAction {
	readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccessAction {
	readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutErrorAction {
	readonly type: typeof LOGOUT_ERROR;
}

export interface IForgotPasswordRequestAction {
	readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordSuccessAction {
	readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
export interface IForgotPasswordErrorAction {
	readonly type: typeof FORGOT_PASSWORD_ERROR;
}

export interface IResetPasswordRequestAction {
	readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccessAction {
	readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordErrorAction {
	readonly type: typeof RESET_PASSWORD_ERROR;
}

export interface IAuthCheckedAction {
	readonly type: typeof AUTH_CHECKED;
}

export type TAuthActions =
	| ILoginRequestAction
	| ILoginSuccessAction
	| ILoginErrorAction
	| IRegisterRequestAction
	| IRegisterSuccessAction
	| IRegisterErrorAction
	| IGetUserRequestAction
	| IGetUserSuccessAction
	| IGetUserErrorAction
	| IUpdateUserRequestAction
	| IUpdateUserSuccessAction
	| IUpdateUserErrorAction
	| ILogoutRequestAction
	| ILogoutSuccessAction
	| ILogoutErrorAction
	| IForgotPasswordRequestAction
	| IForgotPasswordSuccessAction
	| IForgotPasswordErrorAction
	| IResetPasswordRequestAction
	| IResetPasswordSuccessAction
	| IResetPasswordErrorAction
	| IAuthCheckedAction;

export const login =
	(email: string, password: string) =>
	async (dispatch: AppDispatch): Promise<TAuthResponse> => {
		dispatch({ type: LOGIN_REQUEST });
		try {
			const res = await apiFetch<TAuthResponse>(API_URL_LOGIN, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (res.success) {
				localStorage.setItem("stb.refreshToken", res.refreshToken);
				document.cookie = `stb.accessToken=${res.accessToken}; path=/`;
				if (res.user) {
					dispatch({ type: LOGIN_SUCCESS, payload: res.user });
				} else {
					dispatch({ type: LOGIN_ERROR });
				}
			} else {
				dispatch({ type: LOGIN_ERROR });
			}
			return res;
		} catch (err) {
			console.error(err);
			dispatch({ type: LOGIN_ERROR });
			throw err;
		}
	};

export const register =
	(email: string, password: string, name: string) =>
	async (dispatch: AppDispatch): Promise<TAuthResponse> => {
		dispatch({ type: REGISTER_REQUEST });
		try {
			const res = await apiFetch<TAuthResponse>(API_URL_REGISTER, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, name }),
			});

			if (res.user) {
				localStorage.setItem("stb.refreshToken", res.refreshToken);
				document.cookie = `stb.accessToken=${res.accessToken}; path=/`;
				dispatch({ type: REGISTER_SUCCESS, payload: res.user });
			} else {
				dispatch({ type: REGISTER_ERROR });
			}
			return res;
		} catch (err) {
			console.error(err);
			dispatch({ type: REGISTER_ERROR });
			throw err;
		}
	};

export const getUser =
	() =>
	async (dispatch: AppDispatch): Promise<void> => {
		const accessToken = document.cookie
			.split("; ")
			.find((row) => row.startsWith("stb.accessToken="))
			?.split("=")[1];

		if (!accessToken) {
			dispatch({ type: AUTH_CHECKED });
			return;
		}

		dispatch({ type: GET_USER_REQUEST });

		try {
			const res = await apiFetch<TUserResponse>(API_URL_GET_USER, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			if (res.user) {
				dispatch({ type: GET_USER_SUCCESS, payload: res.user });
			} else {
				dispatch({ type: GET_USER_ERROR });
			}
			return;
		} catch (err) {
			console.error(err);
			dispatch({ type: GET_USER_ERROR });
			return;
		} finally {
			dispatch({ type: AUTH_CHECKED });
		}
	};

export const updateUser =
	(form: Record<string, any>) =>
	async (dispatch: AppDispatch): Promise<void> => {
		const accessToken = document.cookie
			.split("; ")
			.find((row) => row.startsWith("stb.accessToken="))
			?.split("=")[1];

		if (!accessToken) {
			return;
		}

		dispatch({ type: UPDATE_USER_REQUEST });
		try {
			const res = await apiFetch<TUserResponse>(API_URL_UPDATE_USER, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			if (res.user) {
				dispatch({ type: UPDATE_USER_SUCCESS, payload: res.user });
			} else {
				dispatch({ type: UPDATE_USER_ERROR });
			}
			return;
		} catch (err) {
			console.error(err);
			dispatch({ type: UPDATE_USER_ERROR });
			return;
		}
	};

export const logout =
	(): AppThunk<Promise<TDefaultResponse>> => async (dispatch) => {
		dispatch({ type: LOGOUT_REQUEST });

		try {
			const res = await apiFetch<TDefaultResponse>(API_URL_LOGOUT, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					token: localStorage.getItem("stb.refreshToken"),
				}),
			});

			if (res.success) {
				localStorage.removeItem("stb.refreshToken");
				document.cookie =
					"stb.accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				dispatch({ type: LOGOUT_SUCCESS });
			} else {
				dispatch({ type: LOGOUT_ERROR });
			}

			return res;
		} catch (err) {
			dispatch({ type: LOGOUT_ERROR });
			throw err;
		}
	};

export const forgotPassword =
	(form: Record<string, any>) =>
	async (dispatch: AppDispatch): Promise<TDefaultResponse> => {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });

		try {
			const res = await apiFetch<TDefaultResponse>(
				API_FORGOT_PASSWORD_URL,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(form),
				}
			);

			dispatch({ type: FORGOT_PASSWORD_SUCCESS });

			return res;
		} catch (err) {
			dispatch({ type: FORGOT_PASSWORD_ERROR });
			throw err;
		}
	};

import type { AppThunk } from "../types";

export const resetPassword =
	(form: Record<string, any>): AppThunk<Promise<TDefaultResponse>> =>
	async (dispatch) => {
		dispatch({ type: RESET_PASSWORD_REQUEST });
		try {
			const res = await apiFetch<TDefaultResponse>(
				API_RESET_PASSWORD_URL,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(form),
				}
			);

			dispatch({ type: RESET_PASSWORD_SUCCESS });

			return res;
		} catch (err) {
			dispatch({ type: RESET_PASSWORD_ERROR });
			throw err;
		}
	};
