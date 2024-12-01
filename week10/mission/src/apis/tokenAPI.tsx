import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost:3000',
});

// 요청 인터셉터 타입 정의
api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 인터셉터 상태 관리
let isRefreshing = false;
type FailedRequest = {
    resolve: (value?: string) => void;
    reject: (reason?: any) => void;
};
let failedQueue: FailedRequest[] = [];

// 큐 처리 함수
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });

    failedQueue = [];
};

// 응답 인터셉터 타입 정의
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // 401 에러 처리
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        }
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                // 리프레시 토큰이 없는 경우 로그아웃 처리
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                return Promise.reject(error);
            }

            try {
                const response = await axios.post<{ accessToken: string }>(
                    'http://localhost:3000/auth/token/access',
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    }
                );

                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                processQueue(null, newAccessToken);

                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
