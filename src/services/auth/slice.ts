import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import { login, logout, registerUser, updateUserData } from './actions';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { TAuthResponse } from '../../utils/burger-api';

function onLogin(state: TUserSlice, action: PayloadAction<TAuthResponse>) {
  state.user = action.payload.user;
  state.isAuthChecked = true;
  setCookie('accessToken', action.payload.accessToken);
  setCookie('refreshToken', action.payload.refreshToken);
}

type TUserSlice = {
  user: TUser | null;
  isAuthChecked: boolean;
  errorMessage: string;
};

const initialState: TUserSlice = {
  user: null,
  isAuthChecked: false,
  errorMessage: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload || '';
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getErrorMessage: (state) => state.errorMessage
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        onLogin(state, action);
      })
      .addCase(login.rejected, (state, action) => {
        state.errorMessage = action.error.message || '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        onLogin(state, action);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorMessage = action.error.message || '';
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUserData.rejected, (_, action) => {
        console.log(action.error);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = initialState.user;
        state.errorMessage = initialState.errorMessage;
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
      })
      .addCase(logout.rejected, (state, action) => {
        console.log(action.error);
      });
  }
});

export const { setUser, setIsAuthChecked, setErrorMessage } = userSlice.actions;
export const { getUser, getIsAuthChecked, getErrorMessage } =
  userSlice.selectors;

export type TAuthActions = ReturnType<
  (typeof userSlice.actions)[keyof typeof userSlice.actions]
>;
