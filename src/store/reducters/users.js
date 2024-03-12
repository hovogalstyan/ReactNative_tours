import { createReducer } from '@reduxjs/toolkit';
import {
  activeSettingsPage,
  clearUsersState,
  updateUsersStorage,
  userLoginRequired,
  userOnAuthGoogleRequired,
  userProfilePasswordUpdateRequired,
  userProfileRequired,
  userRegisterRequired,
} from '../actions/users';

const initialState = {
  profile: {},
  token: null,
  loading: false,
  error: null,
  navbarPage: 0,
};
export const users = createReducer(initialState, (builder) => {
  builder
    .addCase(clearUsersState, (state) => {
      state.token = null;
      state.errors = {};
      state.profile = {};
    })
    .addCase(activeSettingsPage, (state, action) => {
      state.navbarPage = Number(action.payload.page);
    })
    .addCase(updateUsersStorage, (state, action) => {
      const { token = null, profile } = action.payload;
      state.profile = profile;
      state.token = token;
    })
    .addCase(userRegisterRequired.pending, (state) => {
      state.loading = true;
    })
    .addCase(userRegisterRequired.fulfilled, (state, action) => {
      const { token, ...user } = action.payload;
      state.loading = false;
      state.profile = user;
    })
    .addCase(userRegisterRequired.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addCase(userLoginRequired.pending, (state) => {
      state.loading = true;
    })
    .addCase(userLoginRequired.fulfilled, (state, action) => {
      const { token, status, ...user } = action.payload;
      state.loading = false;
      state.profile = user;
      state.token = token;
    })
    .addCase(userLoginRequired.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addCase(userOnAuthGoogleRequired.pending, (state) => {
      state.loading = true;
    })
    .addCase(userOnAuthGoogleRequired.fulfilled, (state, action) => {
      const { token, status, ...user } = action.payload;
      state.loading = false;
      state.profile = user;
      state.token = token;
    })
    .addCase(userOnAuthGoogleRequired.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addCase(userProfileRequired.pending, (state) => {
      state.loading = true;
    })
    .addCase(userProfileRequired.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    })
    .addCase(userProfileRequired.rejected, (state, action) => {
      state.tokenErrorsStatus = action.payload;
      state.loading = false;
    });
});
