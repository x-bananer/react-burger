import type { RootState } from '../types';

export const getWsConnected = (state: RootState) => state.ws.wsConnected;
export const getWsMessages = (state: RootState) => state.ws.messages;