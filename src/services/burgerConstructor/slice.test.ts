import { makeOrder } from "./actions";
import { addConstructorItem, burgerConstructorReducer, constructorItemDown, constructorItemUp, removeConstructorItem } from "./slice";

const testBun = {
    "_id": "643d69a5c3f7b9001cfa093c",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
};

const testFillings = [
    {
        "_id": "643d69a5c3f7b9001cfa0942",
        "name": "Соус Spicy-X",
        "type": "sauce",
        "proteins": 30,
        "fat": 20,
        "carbohydrates": 40,
        "calories": 30,
        "price": 90,
        "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
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
];

describe('Test burger constructor', () => {
    describe('Should add element to burger constructor', () => {
        const initialState = {
            constructorItems: {
                bun: null,
                ingredients: []
            },
            orderRequest: false,
            orderModalData: null
        };
    
        it('Add bun', () => {
            const newState = burgerConstructorReducer(initialState, addConstructorItem(testBun))
    
            const { constructorItems } = newState;
    
            expect(constructorItems).toEqual({
                bun: {
                    ...testBun,
                    id: expect.any(String)
                },
                ingredients: []
            })
        })
    
        it('Add filling', () => {
            const newState = burgerConstructorReducer(initialState, addConstructorItem(testFillings[0]));
    
            const { constructorItems } = newState;
    
            expect(constructorItems).toEqual({
                bun: null,
                ingredients: [{
                    ...testFillings[0],
                    id: expect.any(String)
                }]
            })
    
        })
    });
    
    describe('Should delete filling from constructor', () => {
        const initialState = {
            constructorItems: {
                bun: {
                    ...testBun,
                    id: 'melj124ops8bnnhm'
                },
                ingredients: [{
                    ...testFillings[0],
                    id: '23le6iorvf8rg7pf'
                }]
            },
            orderRequest: false,
            orderModalData: null
        };
    
        it('Should delete element', () => {
            const newState = burgerConstructorReducer(initialState, removeConstructorItem('23le6iorvf8rg7pf'));
    
            const { constructorItems } = newState;
            expect(constructorItems).toEqual({
                bun: {
                    ...testBun,
                    id: expect.any(String)
                },
                ingredients: []
            })
        })
    });
    
    describe('Should move element by one step', () => {
        const initialState = {
            constructorItems: {
                bun: {
                    ...testBun,
                    id: 'melj124ops8bnnhm'
                },
                ingredients: [
                    {
                        ...testFillings[0],
                        id: '23le6iorvf8rg7pf'
                    },
                    {
                        ...testFillings[1],
                        id: '48sj1g2dde62sa1x'
                    }
                ]
            },
            orderRequest: false,
            orderModalData: null
        };
    
        it('Should move bottom element higher', () => {
            const newState = burgerConstructorReducer(initialState, constructorItemUp(1));
    
            const { constructorItems } = newState;
            expect(constructorItems).toEqual({
                bun: {
                    ...testBun,
                    id: expect.any(String)
                },
                ingredients: [
                    {
                        ...testFillings[1],
                        id: '48sj1g2dde62sa1x'
                    },
                    {
                        ...testFillings[0],
                        id: '23le6iorvf8rg7pf'
                    }
                ]
            })
        })
    
        it('Should move top element lower', () => {
            const newState = burgerConstructorReducer(initialState, constructorItemDown(0));
    
            const { constructorItems } = newState;
            expect(constructorItems).toEqual({
                bun: {
                    ...testBun,
                    id: expect.any(String)
                },
                ingredients: [
                    {
                        ...testFillings[1],
                        id: '48sj1g2dde62sa1x'
                    },
                    {
                        ...testFillings[0],
                        id: '23le6iorvf8rg7pf'
                    }
                ]
            })
        })
    });
})
