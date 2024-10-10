import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  TResetData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie } from '../../utils/cookie';
import { setIsAuthChecked, setUser } from './slice';

export const login = createAsyncThunk(
  'user/login',
  async (userData: TLoginData) => loginUserApi(userData)
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData) => registerUserApi(userData)
);

export const logout = createAsyncThunk('auth/logout', async () => logoutApi());

export const updateUserData = createAsyncThunk(
  'user/update',
  async (userData: TRegisterData) => updateUserApi(userData)
);

export const getUserData = createAsyncThunk(
  'user/getUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((user) => dispatch(setUser(user.user)))
        .catch((_) => {
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
        })
        .finally(() => dispatch(setIsAuthChecked()));
    } else {
      dispatch(setIsAuthChecked());
    }
  }
);
