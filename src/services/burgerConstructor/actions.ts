import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  clearConstructorItems,
  setOrderModalData,
  setOrderRequest
} from './slice';
import { getFeedsData } from '../feed/actions';

export const makeOrder = createAsyncThunk(
  'burgerConstructor/order',
  async (burgerData: string[], { dispatch }) => {
    orderBurgerApi(burgerData)
      .then((res) => {
        dispatch(setOrderModalData(res.order));
        dispatch(clearConstructorItems());
        dispatch(getFeedsData());
      })
      .catch((err) =>
        console.log(err)
      )
      .finally(() => {
        dispatch(setOrderRequest(false));
      });
  }
);
