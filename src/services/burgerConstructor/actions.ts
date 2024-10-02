import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  clearConstructorItems,
  setOrderModalData,
  setOrderRequest
} from './slice';
import { getFeedsData, getUserOrdersData } from '../feed/actions';

export const order = createAsyncThunk(
  'burgerConstructor/order',
  async (burgerData: string[], { dispatch }) => {
    orderBurgerApi(burgerData)
      .then((res) => {
        dispatch(setOrderModalData(res.order));
        dispatch(clearConstructorItems());
        dispatch(getFeedsData());
        dispatch(getUserOrdersData());
      })
      .catch((err) =>
        console.log(err)
      )
      .finally(() => {
        dispatch(setOrderRequest(false));
      });
  }
);
