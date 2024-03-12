import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../Api';
import { Profile } from '../../helper/profile';

export const userOnAuthGoogleRequired = createAsyncThunk('user/onAuth', async (arg = {}, thunkAPI) => {
  try {
    const { data } = await Api.onAuthGoogle(arg);
    const { token, ...user } = data;
    await Profile.sendToken(token);
    await Profile.sendUser(JSON.stringify(user));
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const userOnAuthFacebookRequired = createAsyncThunk('user/register-onAuth', async (arg = {}, thunkAPI) => {
  try {
    const { data } = await Api.onAuthFacebook(arg);
    const { token, ...user } = data;
    await Profile.sendToken(token);
    await Profile.sendUser(JSON.stringify(user));
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const userRegisterRequired = createAsyncThunk('user/register', async (arg = {}, thunkAPI) => {
  try {
    const { data } = await Api.register(arg);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const userLoginRequired = createAsyncThunk('user/login', async (arg = {}, thunkAPI) => {
  try {
    const { data } = await Api.login(arg);
    const { token, ...user } = data;
    await Profile.sendToken(token);
    await Profile.sendUser(JSON.stringify(user.user));
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const userProfileRequired = createAsyncThunk('user/profile', async (arg, thunkAPI) => {
  try {
    const { data } = await Api.profile();
    const { profile } = data;
    await Profile.sendUser(JSON.stringify(profile));
    return profile;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const userProfileUpdateRequired = createAsyncThunk('user/profile-update', async (arg = {}, thunkAPI) => {
  try {
    const { data } = await Api.profileUpdate(arg);
    await thunkAPI.dispatch(userProfileRequired());
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const userProfilePasswordUpdateRequired = createAsyncThunk('user/profile-password-update', async (arg = {}, thunkAPI) => {
  try {
    const { data } = await Api.profilePasswordUpdate(arg);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
export const clearUsersState = createAction('clear/user', () => ({
  payload: {

  },
}));

export const updateUsersStorage = createAction('update/user', (token = '', profile = {}) => ({
  payload: {
    token,
    profile,
  },
}));

export const activeSettingsPage = createAction('settings/active-page', (page = '') => ({
  payload: {
    page,
  },
}));
