import { getFeedsData, getOrderByNumber, getUserOrdersData } from "./actions";
import { feedReducer } from "./slice";

describe('Test orders list', () => {

    const initialState = {
        orders: [],
        feedTotal: {
          total: 0,
          totalToday: 0
        },
        userOrders: []
    };

    it('Should add orders to orders list, set total and todays total', () => {
        const expectedResponse = {
            "success": true,
            "orders": [
                {
                    "_id": "67120d1fd829be001c776e94",
                    "ingredients": [
                        "643d69a5c3f7b9001cfa093d",
                        "643d69a5c3f7b9001cfa093e",
                        "643d69a5c3f7b9001cfa093e",
                        "643d69a5c3f7b9001cfa093e",
                        "643d69a5c3f7b9001cfa093d"
                    ],
                    "status": "done",
                    "name": "Флюоресцентный люминесцентный бургер",
                    "createdAt": "2024-10-18T07:24:15.309Z",
                    "updatedAt": "2024-10-18T07:24:16.193Z",
                    "number": 56851
                },
                {
                    "_id": "67120d0fd829be001c776e92",
                    "ingredients": [
                        "643d69a5c3f7b9001cfa093c",
                        "643d69a5c3f7b9001cfa093e",
                        "643d69a5c3f7b9001cfa0940",
                        "643d69a5c3f7b9001cfa093e",
                        "643d69a5c3f7b9001cfa0940",
                        "643d69a5c3f7b9001cfa0940",
                        "643d69a5c3f7b9001cfa093c"
                    ],
                    "status": "done",
                    "name": "Краторный люминесцентный метеоритный бургер",
                    "createdAt": "2024-10-18T07:23:59.438Z",
                    "updatedAt": "2024-10-18T07:24:00.399Z",
                    "number": 56850
                }
            ],
            "total": 56477,
            "totalToday": 211
        }

        const  newState = feedReducer(initialState, getFeedsData.fulfilled(expectedResponse, ''))

        expect(newState).toEqual({
            orders: expectedResponse.orders,
            feedTotal: {
                total: 56477,
                totalToday: 211
            },
            userOrders: []
        })
    });

    it('Should add users orders to users orders list', () => {
        const expectedResponse = [
            {
                "_id": "67120d1fd829be001c776e94",
                "ingredients": [
                    "643d69a5c3f7b9001cfa093d",
                    "643d69a5c3f7b9001cfa093e",
                    "643d69a5c3f7b9001cfa093e",
                    "643d69a5c3f7b9001cfa093e",
                    "643d69a5c3f7b9001cfa093d"
                ],
                "status": "done",
                "name": "Флюоресцентный люминесцентный бургер",
                "createdAt": "2024-10-18T07:24:15.309Z",
                "updatedAt": "2024-10-18T07:24:16.193Z",
                "number": 56851
            },
            {
                "_id": "67120d0fd829be001c776e92",
                "ingredients": [
                    "643d69a5c3f7b9001cfa093c",
                    "643d69a5c3f7b9001cfa093e",
                    "643d69a5c3f7b9001cfa0940",
                    "643d69a5c3f7b9001cfa093e",
                    "643d69a5c3f7b9001cfa0940",
                    "643d69a5c3f7b9001cfa0940",
                    "643d69a5c3f7b9001cfa093c"
                ],
                "status": "done",
                "name": "Краторный люминесцентный метеоритный бургер",
                "createdAt": "2024-10-18T07:23:59.438Z",
                "updatedAt": "2024-10-18T07:24:00.399Z",
                "number": 56850
            }
        ]

        const  newState = feedReducer(initialState, getUserOrdersData.fulfilled(expectedResponse, ''))

        expect(newState).toEqual({
            orders: [],
            feedTotal: {
                total: 0,
                totalToday: 0
            },
            userOrders: expectedResponse
        })
    });

    it('Should add order with stated number to orders list', () => {
        const expectedResponse = {
            success: true,
            orders: [
                {
                    "_id": "67120d0fd829be001c776e92",
                    "ingredients": [
                        "643d69a5c3f7b9001cfa093c",
                        "643d69a5c3f7b9001cfa093e",
                        "643d69a5c3f7b9001cfa0940",
                        "643d69a5c3f7b9001cfa093e",
                        "643d69a5c3f7b9001cfa0940",
                        "643d69a5c3f7b9001cfa0940",
                        "643d69a5c3f7b9001cfa093c"
                    ],
                    "status": "done",
                    "name": "Краторный люминесцентный метеоритный бургер",
                    "createdAt": "2024-10-18T07:23:59.438Z",
                    "updatedAt": "2024-10-18T07:24:00.399Z",
                    "number": 56850
                }
            ]
        }

        const  newState = feedReducer(initialState, getOrderByNumber.fulfilled(expectedResponse, '', 56850))

        expect(newState).toEqual({
            orders: expectedResponse.orders,
            feedTotal: {
                total: 0,
                totalToday: 0
            },
            userOrders: []
        })
    });
})
