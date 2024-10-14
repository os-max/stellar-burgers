import { nanoid } from "@reduxjs/toolkit";
import { addConstructorItem, burgerConstructorReducer, removeConstructorItem } from "./slice";

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

const testFilling = {
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
}

describe('Проверка добавления элементов в конструктор', () => {
    const initialState = {
        constructorItems: {
            bun: null,
            ingredients: []
        },
        orderRequest: false,
        orderModalData: null
    };

    it('Добавление булки в заказ', () => {
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

    it('Добавление начинки в заказ', () => {
        const newState = burgerConstructorReducer(initialState, addConstructorItem(testFilling));

        const { constructorItems } = newState;

        expect(constructorItems).toEqual({
            bun: null,
            ingredients: [{
                ...testFilling,
                id: expect.any(String)
            }]
        })

    })
});

describe('Проверка удаления элементов из конструктор', () => {
    const initialState = {
        constructorItems: {
            bun: {
                ...testBun,
                id: 'melj124ops8bnnhm'
            },
            ingredients: [{
                ...testFilling,
                id: '23le6iorvf8rg7pf'
            }]
        },
        orderRequest: false,
        orderModalData: null
    };

    it('Удаление элемента', () => {
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
