import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const order = createAsyncThunk(
  'burgerConstructor/order',
  async (burgerData: string[]) => orderBurgerApi(burgerData)
);
