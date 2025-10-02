export const apiFetch = async (endpoint, options = {}) => {
    const API_BASE_URL = 'https://norma.nomoreparties.space/api';
    const url = `${API_BASE_URL}${endpoint}`;

    const accessToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('stb.accessToken='))
        ?.split('=')[1];

    const optsWithAuth = {
        ...options,
        headers: {
            ...options.headers,
            ...(accessToken ? { Authorization: accessToken } : {})
        }
    };

    const request = async (opts) => {
        const res = await fetch(url, opts);
        if (!res.ok) {
            throw new Error(res.status);
        }
        return res.json();
    };

    try {
        return await request(optsWithAuth);
    } catch (err) {
        if (err.message === '401' || err.message === '403') {
            const refreshToken = localStorage.getItem('stb.refreshToken');
            if (!refreshToken) {
                throw err;
            }
            const tokenResponse = await fetch(`${API_BASE_URL}/auth/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: refreshToken })
            });

            if (!tokenResponse.ok) {
                throw new Error(tokenResponse.status);
            }

            const refreshData = await tokenResponse.json();

            if (!refreshData.success) {
                throw new Error('Ошибка обновления токена');
            }

            localStorage.setItem('stb.refreshToken', refreshData.refreshToken);
            document.cookie = `stb.accessToken=${refreshData.accessToken}; path=/`;

            const retryOptions = {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: refreshData.accessToken
                }
            };

            return await request(retryOptions);
        }
        throw err;
    }
};
