import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiLogin, apiRegister } from '../../api/auth';
import {
  apiChangePassword,
  apiGetUserFromToken,
  apiUpdateStudiedForUser,
  apiUpdateUser,
} from '../../api/user';

export const requestLogin = createAsyncThunk('auth/login', async (props) => {
  console.log(props);
  const res = await apiLogin(props);
  return res.data;
});

export const requestRegister = createAsyncThunk(
  'auth/register',
  async (props) => {
    const res = await apiRegister(props);
    return res.data;
  }
);

export const requestGetUserFromToken = createAsyncThunk(
  'user/requestGetUserFromToken',
  async (props) => {
    const res = await apiGetUserFromToken(props.token);
    return res.data;
  }
);

export const requestUpdateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async (props) => {
    const res = await apiUpdateUser(props);
    return res.data;
  }
);

export const requestChangePassword = createAsyncThunk(
  'user/changePassword',
  async (props) => {
    const res = await apiChangePassword(props);
    return res.data;
  }
);

export const requestUpdateStudiedForUser = createAsyncThunk(
  'user/updateStudiedForUser',
  async (props) => {
    const res = await apiUpdateStudiedForUser(props);
    return res.data;
  }
);
