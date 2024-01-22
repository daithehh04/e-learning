import { createSlice } from '@reduxjs/toolkit';
import TTCSconfig from '../../helper/config';
import {
  requestChangePassword,
  requestGetUserFromEmailGoogle,
  requestGetUserFromToken,
  requestLogin,
  requestRegister,
  requestUpdateStudiedForUser,
  requestUpdateUserInfo,
} from '../middleware/userMiddleware';
// import _ from "lodash";

const initialState = {
  userInfo: null,
  userInfoEmailGg: null,
  loading: false,
  loadingCheckLogin: true,
  loadingCheckLoginGmail: true,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * login
     */
    builder.addCase(requestLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestLogin.fulfilled, (state, action) => {
      state.userInfo = action.payload.userLogin;
      state.loading = false;
    });
    // requestGetUserFromToken
    builder.addCase(requestGetUserFromToken.pending, (state) => {
      state.loadingCheckLogin = true;
    });
    builder.addCase(requestGetUserFromToken.fulfilled, (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.loadingCheckLogin = false;
    });
    builder.addCase(requestGetUserFromToken.rejected, (state) => {
      state.loadingCheckLogin = false;
    });

    // requestGetUserFromEmailGoogle
    builder.addCase(requestGetUserFromEmailGoogle.pending, (state) => {
      state.loadingCheckLoginGmail = true;
    });
    builder.addCase(
      requestGetUserFromEmailGoogle.fulfilled,
      (state, action) => {
        state.userInfoEmailGg = action.payload.userInfo;
        state.loadingCheckLoginGmail = false;
      }
    );
    builder.addCase(requestGetUserFromEmailGoogle.rejected, (state) => {
      state.loadingCheckLoginGmail = false;
    });

    /**
     * register
     */
    builder.addCase(requestRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestRegister.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.loginCode === TTCSconfig.STATUS_SUCCESS)
        state.userInfo = action.payload.info;
    });
    builder.addCase(requestRegister.rejected, (state, action) => {
      state.loading = false;
    });
    /**
     * updateUser
     */
    builder.addCase(requestUpdateUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestUpdateUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.userInfo;
    });

    /**
     * changePassword
     */
    builder.addCase(requestChangePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestChangePassword.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.loginCode === TTCSconfig.STATUS_SUCCESS)
        state.userInfo = action.payload.UserInfo;
    });

    /**
     * updateStudiedUser
     */
    builder.addCase(requestUpdateStudiedForUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestUpdateStudiedForUser.fulfilled, (state, action) => {
      state.userInfo = action.payload.data;
    });
  },
});

export const authState = (state) => state.authState;

export const { loadUserInfo } = authSlice.actions;
export default authSlice.reducer;
