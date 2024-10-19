import { ingredientsReducer } from "./slice";
import { getIngredients } from "./actions";

describe('Test ingredients list', () => {

    const initialState = {
        isIngredientLoading: false,
        ingredientList: null
    }

    const testIngredients = [
        {
            "_id": "643d69a5c3f7b9001cfa0941",
            "name": "Биокотлета из марсианской Магнолии",
            "type": "main",
            "proteins": 420,
            "fat": 142,
            "carbohydrates": 242,
            "calories": 4242,
            "price": 424,
            "image": "https://code.s3.yandex.net/react/code/meat-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
            "__v": 0
        },
        {
            "_id": "643d69a5c3f7b9001cfa093e",
            "name": "Филе Люминесцентного тетраодонтимформа",
            "type": "main",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "price": 988,
            "image": "https://code.s3.yandex.net/react/code/meat-03.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
            "__v": 0
        }
    ]

    it('While pending should set isIngredientLoading to true', () => {
        const newState = ingredientsReducer(initialState, getIngredients.pending(''))

        expect(newState.isIngredientLoading).toBe(true);
        expect(newState.ingredientList).toBe(null);
    })

    it('On success should add ingredients to store and set isIngredientLoading to false', async () => {
        const newState = ingredientsReducer(initialState, getIngredients.fulfilled(testIngredients, ''));

        expect(newState.isIngredientLoading).toBe(false);
        expect(newState.ingredientList).toEqual(testIngredients);
    })

    it('On error should set isIngredientLoading to false and log error to console', async () => {
        const newState = ingredientsReducer(initialState, getIngredients.rejected(new Error('test error'), ''));

        expect(newState.isIngredientLoading).toBe(false);
        expect(newState.ingredientList).toEqual(null);
    })
})
