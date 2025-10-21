export type TUser = {
  email: string;
  name: string;
};

export type TAuthState = {
  user: TUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  isAuthChecked: boolean;
  canResetPassword: boolean;
};

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