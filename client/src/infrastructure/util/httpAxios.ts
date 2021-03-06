import axios from 'axios';
import { Http } from './Http';

const headers = {
  'Content-Type': 'application/json',
};

axios.defaults.baseURL = `http://localhost:8080`;

export const HttpAxios: Http = {
  get: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.get(path, {
      ...config,
      params: params,
      headers,
    });
    return response.data as T;
  },
  post: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.post(
      path,
      { ...params },
      { ...config, headers },
    );
    return response.data as T;
  },
  patch: async <T>(
    path: string,
    params?: Record<string, any>,
    config?: any,
  ) => {
    const response = await axios.patch(
      path,
      { ...params },
      { ...config, headers },
    );
    return response.data as T;
  },
  delete: async <T>(path: string, params?: any, config?: any) => {
    const response = await axios.delete(path, {
      ...config,
      params: params,
      headers,
    });
    return response.data as T;
  },
};
