import { ApiConfig } from './config';
import EndPoint from '../helper/endpoint';

export const apiGetUserFromToken = (token) => {
  return ApiConfig(EndPoint.GET_USER_FROM_TOKEN, {
    payload: {
      token,
    },
  });
};
export const apiUpdateUser = async (payload) => {
  return ApiConfig(EndPoint.UPDATE_USER, { payload });
};

export const apiChangePassword = async (payload) => {
  return ApiConfig(EndPoint.CHANGE_PASSWORD, { payload });
};

export const apiUpdateStudiedForUser = async (payload) => {
  return ApiConfig(EndPoint.UPDATE_STUDYED_FOR_USER, { payload });
};
