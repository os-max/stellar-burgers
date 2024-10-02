import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsData, getUserOrdersData } from './actions';

type TFeedSlice = {
  orders: TOrder[];
  feedTotal: {
    total: number;
    totalToday: number;
  };
  myOrders: TOrder[];
};

const initialState: TFeedSlice = {
  orders: [],
  feedTotal: {
    total: 0,
    totalToday: 0
  },
  myOrders: []
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeed: (state) => state.orders,
    getTotal: (state) => state.feedTotal,
    getUserOrders: (state) => state.myOrders
  },
  extraReducers: (builder) =>
    builder
      .addCase(getFeedsData.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.feedTotal.total = action.payload.total;
        state.feedTotal.totalToday = action.payload.totalToday;
      })
      .addCase(getUserOrdersData.fulfilled, (state, action) => {
        state.myOrders = action.payload;
      })
});

// export const {  } = feedSlice.actions;
export const { getFeed, getTotal, getUserOrders } = feedSlice.selectors;

export type TFeedActions = ReturnType<
  (typeof feedSlice.actions)[keyof typeof feedSlice.actions]
>;
