import { apiFetch } from '../../utils/api';

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
    RESET_PASSWORD_ERROR
} from '../reducers/authReducer';

const API_URL_LOGIN = 'https://norma.nomoreparties.space/api/auth/login';
const API_URL_REGISTER = 'https://norma.nomoreparties.space/api/auth/register';
const API_URL_GET_USER = 'https://norma.nomoreparties.space/api/auth/user';
const API_URL_UPDATE_USER = 'https://norma.nomoreparties.space/api/auth/user';
const API_URL_LOGOUT = 'https://norma.nomoreparties.space/api/auth/logout';
const API_FORGOT_PASSWORD_URL = 'https://norma.nomoreparties.space/api/password-reset';
const API_RESET_PASSWORD_URL = 'https://norma.nomoreparties.space/api/password-reset/reset';



export const login = (form) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const res = await apiFetch(API_URL_LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            throw new Error(res.status);
        }

        if (res.success) {
            localStorage.setItem('stb.refreshToken', res.refreshToken);
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

export const register = (email, password, name) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const res = await apiFetch(API_URL_REGISTER, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        });

        if (res.success) {
            localStorage.setItem('stb.refreshToken', res.refreshToken);
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

export const getUser = () => async (dispatch) => {
    const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('stb.accessToken='))
        ?.split('=')[1];

    if (!accessToken) {
        dispatch({ type: AUTH_CHECKED });
        return;
    }

    dispatch({ type: GET_USER_REQUEST });

    try {
        const res = await apiFetch(API_URL_GET_USER, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
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

export const updateUser = (form) => async (dispatch) => {
    const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('stb.accessToken='))
        ?.split('=')[1];

    if (!accessToken) {
        return;
    }

    dispatch({ type: UPDATE_USER_REQUEST });
    try {
        const res = await apiFetch(API_URL_UPDATE_USER, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
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

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });

    try {
        const res = await apiFetch(API_URL_LOGOUT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: localStorage.getItem('stb.refreshToken') })
        });

        if (res.success) {
            localStorage.removeItem('stb.refreshToken');
            document.cookie = 'stb.accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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

export const forgotPassword = (form) => async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    
    try {
        const res = await apiFetch(API_FORGOT_PASSWORD_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        dispatch({ type: FORGOT_PASSWORD_SUCCESS });

        return res;
    } catch (err) {
        dispatch({ type: FORGOT_PASSWORD_ERROR });
        return err;
    }
};

export const resetPassword = (form) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {

        const res = await apiFetch(API_RESET_PASSWORD_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        dispatch({ type: RESET_PASSWORD_SUCCESS });

        return res;
    } catch (err) {
        dispatch({ type: RESET_PASSWORD_ERROR });
        return err;
    }
};
