import { createRequest } from './request';

const { VITE_BASE_API } = import.meta.env;

export const request = createRequest({ baseURL: VITE_BASE_API });

