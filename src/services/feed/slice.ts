import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsData } from './actions';

type TFeedSlice = {
  orders: TOrder[];
  feedTotal: {
    total: number;
    totalToday: number;
  };
};

const initialState: TFeedSlice = {
  orders: [],
  feedTotal: {
    total: 0,
    totalToday: 0
  }
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeed: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    }
  },
  selectors: {
    getFeed: (state) => state.orders,
    getTotal: (state) => state.feedTotal
  },
  extraReducers: (builder) =>
    builder.addCase(getFeedsData.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.feedTotal.total = action.payload.total;
      state.feedTotal.totalToday = action.payload.totalToday;
    })
});

export const { setFeed } = feedSlice.actions;
export const { getFeed, getTotal } = feedSlice.selectors;

export type TFeedActions = ReturnType<
  (typeof feedSlice.actions)[keyof typeof feedSlice.actions]
>;
