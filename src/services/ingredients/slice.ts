import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

type TIngredientSlice = {
  isIngredientLoading: boolean;
  ingredientList: TIngredient[] | null;
};

const initialState: TIngredientSlice = {
  isIngredientLoading: false,
  ingredientList: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIsIngredientLoading: (state, action: PayloadAction<boolean>) => {
      state.isIngredientLoading = action.payload;
    },
    setIngredientList: (state, action: PayloadAction<TIngredient[] | null>) => {
      state.ingredientList = action.payload;
    }
  },
  selectors: {
    getIsIngredientLoading: (state) => state.isIngredientLoading,
    getIngredientList: (state) => state.ingredientList
  },
  extraReducers: (builder) =>
    builder
      .addCase(getIngredients.pending, (state, action) => {
        state.isIngredientLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientList = action.payload;
        state.isIngredientLoading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        console.log(action.error);
        state.isIngredientLoading = false;
      })
});

export const { setIsIngredientLoading, setIngredientList } =
  ingredientsSlice.actions;
export const { getIsIngredientLoading, getIngredientList } =
  ingredientsSlice.selectors;

export type TIngredientsActions = ReturnType<
  (typeof ingredientsSlice.actions)[keyof typeof ingredientsSlice.actions]
>;
