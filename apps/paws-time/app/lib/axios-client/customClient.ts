import { useAuthStore } from "@/app/hooks/authStore";
import Axios, { AxiosError, AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
}); // use your own URL here or environment variable

// 요청 인터셉터: Authorization 헤더에 JWT 토큰 추가
AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // Zustand에서 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 에러 처리
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 예: 401 Unauthorized 처리 (로그아웃, 알림 등)
      useAuthStore.getState().clearToken(); // Zustand에서 토큰 초기화
    }
    return Promise.reject(error);
  }
);

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
