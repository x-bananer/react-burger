import { apiFetch } from "../../utils/api.ts";

export type TAuthResponse = {
	success: boolean;
	user?: { email: string; name: string };
	refreshToken: string;
	accessToken: string;
};

export type TUserResponse = {
	success: boolean;
	user?: { email: string; name: string };
};

export type TDefaultResponse = {
	success: boolean;
	message?: string;
};

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
} from "../reducers/authReducer.ts";

const API_URL_LOGIN = "/auth/login";
const API_URL_REGISTER = "/auth/register";
const API_URL_GET_USER = "/auth/user";
const API_URL_UPDATE_USER = "/auth/user";
const API_URL_LOGOUT = "/auth/logout";
const API_FORGOT_PASSWORD_URL = "/password-reset";
const API_RESET_PASSWORD_URL = "/password-reset/reset";

export const login =
	(form: Record<string, any>) =>
	async (dispatch: any): Promise<any> => {
		dispatch({ type: LOGIN_REQUEST });
		try {
			const res = await apiFetch<TAuthResponse>(API_URL_LOGIN, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			if (res.success) {
				localStorage.setItem("stb.refreshToken", res.refreshToken);
				document.cookie = `stb.accessToken=${res.accessToken}; path=/`;
				dispatch({ type: LOGIN_SUCCESS, payload: res.user });
			} else {
				dispatch({ type: LOGIN_ERROR });
			}
			return res;
		} catch (err) {
			console.error(err);
			dispatch({ type: LOGIN_ERROR });
			return err;
		}
	};

export const register =
	(email: string, password: string, name: string) =>
	async (dispatch: any): Promise<any> => {
		dispatch({ type: REGISTER_REQUEST });
		try {
			const res = await apiFetch<TAuthResponse>(API_URL_REGISTER, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, name }),
			});

			if (res.success) {
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
			return err;
		}
	};

export const getUser =
	() =>
	async (dispatch: any): Promise<any> => {
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

			if (res.success) {
				dispatch({ type: GET_USER_SUCCESS, payload: res.user });
			} else {
				dispatch({ type: GET_USER_ERROR });
			}
			return res;
		} catch (err) {
			console.error(err);
			dispatch({ type: GET_USER_ERROR });
			return err;
		} finally {
			dispatch({ type: AUTH_CHECKED });
		}
	};

export const updateUser =
	(form: Record<string, any>) =>
	async (dispatch: any): Promise<any> => {
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

			if (res.success) {
				dispatch({ type: UPDATE_USER_SUCCESS, payload: res.user });
			} else {
				dispatch({ type: UPDATE_USER_ERROR });
			}
			return res;
		} catch (err) {
			console.error(err);
			dispatch({ type: UPDATE_USER_ERROR });
			return err;
		}
	};

export const logout =
	() =>
	async (dispatch: any): Promise<any> => {
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
			return err;
		}
	};

export const forgotPassword =
	(form: Record<string, any>) =>
	async (dispatch: any): Promise<any> => {
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
			return err;
		}
	};

export const resetPassword =
	(form: Record<string, any>) =>
	async (dispatch: any): Promise<any> => {
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
			return err;
		}
	};
