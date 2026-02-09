export type TWS = {
	success: boolean;
	timestamp?: string;
	event?: string;
	data?: unknown;
	error?: string;
};

export type TWSState = {
	messages: TWS[];
	wsConnected: boolean;
	error?: Event | null;
};
