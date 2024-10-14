import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructor,
  TConstructorIngredient,
  TIngredient,
  TOrder
} from '@utils-types';
import { makeOrder } from './actions';

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
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    clearConstructorItems: (state) => {
      state.constructorItems = initialState.constructorItems;
    },
    constructorItemUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const t = state.constructorItems.ingredients[index];
      state.constructorItems.ingredients[index] =
        state.constructorItems.ingredients[index - 1];
      state.constructorItems.ingredients[index - 1] = t;
    },
    constructorItemDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const t = state.constructorItems.ingredients[index];
      state.constructorItems.ingredients[index] =
        state.constructorItems.ingredients[index + 1];
      state.constructorItems.ingredients[index + 1] = t;
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action: PayloadAction<TOrder>) => {
      state.orderModalData = action.payload;
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
    builder.addCase(makeOrder.pending, (state) => {
      state.orderRequest = true;
    })
});

export const {
  addConstructorItem,
  removeConstructorItem,
  setOrderRequest,
  setOrderModalData,
  clearOrderModalData,
  constructorItemUp,
  constructorItemDown,
  clearConstructorItems
} = burgerConstructorSlice.actions;

export const { getConstructorItems, getOrderModalData, getOrderRequest } =
  burgerConstructorSlice.selectors;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export type TBurgerConstructorActions = ReturnType<
  (typeof burgerConstructorSlice.actions)[keyof typeof burgerConstructorSlice.actions]
>;
