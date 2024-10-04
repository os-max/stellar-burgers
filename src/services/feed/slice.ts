import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsData, getOrderByNumber, getUserOrdersData } from './actions';

type TFeedSlice = {
  orders: TOrder[];
  feedTotal: {
    total: number;
    totalToday: number;
  };
  userOrders: TOrder[];
};

const initialState: TFeedSlice = {
  orders: [],
  feedTotal: {
    total: 0,
    totalToday: 0
  },
  userOrders: []
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeed: (state) => state.orders,
    getTotal: (state) => state.feedTotal,
    getUserOrders: (state) => state.userOrders
  },
  extraReducers: (builder) =>
    builder
      .addCase(getFeedsData.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.feedTotal.total = action.payload.total;
        state.feedTotal.totalToday = action.payload.totalToday;
      })
      .addCase(getFeedsData.rejected, (state, action) => {
        console.log(action.error)
      })
      .addCase(getUserOrdersData.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      })
      .addCase(getUserOrdersData.rejected, (state, action) => {
        console.log(action.error)
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        if (!state.orders.find(order => order._id === action.payload.orders[0]?._id))
          state.orders.push(action.payload.orders[0])
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        console.log(action.error)
      })
});

export const { getFeed, getTotal, getUserOrders } = feedSlice.selectors;

export type TFeedActions = ReturnType<
  (typeof feedSlice.actions)[keyof typeof feedSlice.actions]
>;
