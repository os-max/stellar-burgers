import { burgerConstructorReducer } from "./burgerConstructor/slice";
import { feedReducer } from "./feed/slice";
import { ingredientsReducer } from "./ingredients/slice";
import { rootReducer } from "./store";
import { userReducer } from "./user/slice";


describe('Test rootReducer', () => {
    it('Test state of store on initialization', () => {
        const initAction = { type: '@@INIT' };
        const state = rootReducer(undefined, initAction);
        expect(state).toEqual({
          burgerConstructor: burgerConstructorReducer(undefined, initAction),
          feed: feedReducer(undefined, initAction),
          ingredients: ingredientsReducer(undefined, initAction),
          user: userReducer(undefined, initAction)
        });
    });
});
