import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructor,
  TConstructorIngredient,
  TIngredient,
  TOrder
} from '@utils-types';
import { order } from './actions';

type TBurgerConstructorSlice = {
  constructorItems: TConstructor;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TBurgerConstructorSlice = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeConstructorItem: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.constructorItems.ingredients = state.constructorItems.ingredients.filter(
        ingredient => ingredient._id !== action.payload
      );
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    clearOrderModalData: (state) => {
      state.orderModalData = initialState.orderModalData;
    }
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) =>
    builder
      .addCase(order.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(order.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
        state.constructorItems = initialState.constructorItems;
      })
      .addCase(order.rejected, (state, action) => {
        console.log(action.error);
      })
});

export const {
  addConstructorItem,
  removeConstructorItem,
  setOrderRequest,
  clearOrderModalData
} = burgerConstructorSlice.actions;

export const { getConstructorItems, getOrderModalData, getOrderRequest } =
  burgerConstructorSlice.selectors;

export type TBurgerConstructorActions = ReturnType<
  (typeof burgerConstructorSlice.actions)[keyof typeof burgerConstructorSlice.actions]
>;
