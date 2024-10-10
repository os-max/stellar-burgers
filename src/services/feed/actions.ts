import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeedsData = createAsyncThunk('feed/getFeeds', async () =>
  getFeedsApi()
);

export const getUserOrdersData = createAsyncThunk('feed/getOrders', async () =>
  getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);
