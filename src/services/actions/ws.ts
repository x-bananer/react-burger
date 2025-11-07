import {
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_MESSAGE,
	WS_SEND_MESSAGE,
} from "../constants";

import type { TWS } from "../types/ws";

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

