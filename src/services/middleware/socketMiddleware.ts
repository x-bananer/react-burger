import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../types';
import type { TApplicationActions } from '../types';

export const socketMiddleware = (wsUrl: string): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return next => (action: TApplicationActions) => {
			const { dispatch } = store;
			const { type } = action;
            const payload = 'payload' in action ? (action as any).payload : undefined;

			if (type === 'WS_CONNECTION_START') {
				socket = new WebSocket(wsUrl);
			}

			if (socket) {
				socket.onopen = event => {
					dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
				};

				socket.onerror = event => {
					dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
				};

				socket.onmessage = event => {
					const { data } = event;
					dispatch({ type: 'WS_GET_MESSAGE', payload: data });
				};

				socket.onclose = event => {
					dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
				};

				if (type === 'WS_SEND_MESSAGE') {
					socket.send(JSON.stringify(payload));
				}
			}

			return next(action);
		};
	}) as Middleware;
};