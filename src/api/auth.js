import { ApiConfig } from './config';
import EndPoint from '../helper/endpoint';

export const apiLogin = (payload) => {
  return ApiConfig(EndPoint.LOGIN, { payload });
};

export const apiRegister = (payload) => {
  return ApiConfig(EndPoint.REGISTER, { payload });
};

export const apiLogout = (payload) => {
  return ApiConfig(EndPoint.LOGOUT, { payload });
};
