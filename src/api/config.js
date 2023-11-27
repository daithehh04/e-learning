import axios from 'axios';

export const PREFIX_API = import.meta.env.VITE_APP_PREFIX_API;
export const ENDPOINT_LOCAL = import.meta.env.VITE_APP_ENDPOINT;

const axiosInstance = axios.create({
  baseURL: `${ENDPOINT_LOCAL}/${PREFIX_API}`,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const ApiConfig = async (
  url,
  data,
  _method = 'POST',
  apiPrefix = PREFIX_API
) => {
  const method = _method.toLowerCase();
  const config = {
    url,
    method,
    data: data?.payload,
    params: data?.params,
  };
  if (apiPrefix !== PREFIX_API)
    config.baseURL = `${ENDPOINT_LOCAL}/${apiPrefix}`;
  return axiosInstance.request(config);
};

export const ApiUploadFile = async (url, file, fieldName = 'file') => {
  const formData = new FormData();
  formData.append(fieldName, file);
  return axiosInstance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
