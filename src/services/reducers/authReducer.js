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

export const SET_CAN_RESET_PASSWORD = 'SET_CAN_RESET_PASSWORD';

const initialState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    isAuthChecked: false,
    canResetPassword: false
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_USER_REQUEST:
        case UPDATE_USER_REQUEST:
        case LOGOUT_REQUEST:
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
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        case LOGOUT_SUCCESS:
            return {
                user: null,
                isLoggedIn: false,
                isLoading: false,
                isError: false,
                isAuthChecked: true,
            };
        case AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: true
            };
        case SET_CAN_RESET_PASSWORD:
            return {
                ...state,
                canResetPassword: action.payload
            };
        default:
            return state;
    }
};