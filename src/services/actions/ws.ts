import {
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE,
	WS_SEND_MESSAGE,
} from "../constants";

import type { TWS } from "../types/ws";
import type { AppDispatch } from "../types";

const API_WS_URL_ORDERS_ALL = "/orders";

export interface IWSConnectionStartAction {
	type: typeof WS_CONNECTION_START;
}

export interface IWSConnectionSuccessAction {
	type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
	type: typeof WS_CONNECTION_ERROR;
	payload?: Event;
}

export interface IWSConnectionClosedAction {
	type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
	type: typeof WS_GET_MESSAGE;
	payload?: TWS;
}

export interface IWSSendMessageAction {
	type: typeof WS_SEND_MESSAGE;
	payload?: unknown;
}

export type TWSActions =
	| IWSConnectionStartAction
	| IWSConnectionSuccessAction
	| IWSConnectionErrorAction
	| IWSConnectionClosedAction
	| IWSGetMessageAction
	| IWSSendMessageAction;


export const wsConnectionStart = (url: string) => ({
	type: WS_CONNECTION_START,
	payload: url
});

export const wsConnectionSuccess = () => ({
	type: WS_CONNECTION_SUCCESS
});

export const wsConnectionError = (event: Event) => ({
	type: WS_CONNECTION_ERROR,
	payload: event
});

export const wsConnectionClosed = () => ({
	type: WS_CONNECTION_CLOSED
});

export const wsGetMessage = (data: TWS) => ({
	type: WS_GET_MESSAGE,
	payload: data
});

export const wsSendMessage = (message: unknown) => ({
	type: WS_SEND_MESSAGE,
	payload: message
});
