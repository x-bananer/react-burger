export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const AUTH_CHECKED = 'AUTH_CHECKED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export type AuthState = {
    user: any | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    isError: boolean;
    isAuthChecked: boolean;
    canResetPassword: boolean;
};

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    isAuthChecked: false,
    canResetPassword: false
};

export const authReducer = (state: AuthState = initialState, action: { type: string; payload?: any }): AuthState => {
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
                isError: false
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
                isError: false
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
                isError: true
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                canResetPassword: true
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                canResetPassword: false
            };
        case LOGOUT_SUCCESS:
            return {
                user: null,
                isLoggedIn: false,
                isLoading: false,
                isError: false,
                isAuthChecked: true,
                canResetPassword: false
            };
        case AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: true
            };
        default:
            return state;
    }
};