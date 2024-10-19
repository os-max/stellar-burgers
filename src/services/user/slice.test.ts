import { deleteCookie } from "../../utils/cookie";
import { login, logout, registerUser, updateUserData } from "./actions"
import { userReducer } from "./slice"

afterEach(() => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
})

describe('Test for registration/authorization', () => {
    const initialState = {
        user: null,
        isAuthChecked: false,
        errorMessage: ''
    }

    const authResponse = {
        accessToken: "Bearer test",
        refreshToken: "test",
        user: {
            name: 'Test Test',
            email: 'test@test.com'
        },
        success: true
    }

    describe('Test authorization', () => {
        const authCredentials = {
            email: "test@test.com",
            password: 'test'
        };

        it('On success should add user to store', () => {
            const newState = userReducer(initialState, login.fulfilled(authResponse, '', authCredentials))
    
            expect(newState).toEqual({
                user: authResponse.user,
                isAuthChecked: true,
                errorMessage: ''
            })
        });
    
        it('On error should add error message to store', () => {
            const newState = userReducer(initialState, login.rejected(new Error('test error'), '', authCredentials))
    
            expect(newState).toEqual({
                user: null,
                isAuthChecked: false,
                errorMessage: 'test error'
            })
        });
    });

    describe('Test registration', () => {

        const registerCredentials = {
            email: "test@test.com",
            password: 'test',
            name: 'Test Test'
        };
        
        it('On success should add user to store', () => {
            const newState = userReducer(initialState, registerUser.fulfilled(authResponse, '', registerCredentials))
    
            expect(newState).toEqual({
                user: authResponse.user,
                isAuthChecked: true,
                errorMessage: ''
            })
        });
    
        it('On error should add error message to store', () => {
            const newState = userReducer(initialState, registerUser.rejected(new Error('test error'), '', registerCredentials))
    
            expect(newState).toEqual({
                user: null,
                isAuthChecked: false,
                errorMessage: 'test error'
            })
        });
    });

    describe('Test user data update', () => {

        const newCredentials = {
            email: "test2@test.com",
            password: 'test2',
            name: 'Test2 Test2'
        };

        const updateResponse = {
            user: {
                email: "test2@test.com",
                name: 'Test2 Test2'
            },
            success: true
        }

        const updateInitialState = {
            user: {
                email: "test@test.com",
                name: 'Test Test'
            },
            isAuthChecked: true,
            errorMessage: ''
        }
        
        it('Should update user data in store', () => {
            const newState = userReducer(updateInitialState, updateUserData.fulfilled(updateResponse, '', newCredentials))
    
            expect(newState).toEqual({
                user: {
                    name: 'Test2 Test2',
                    email: "test2@test.com"
                },
                isAuthChecked: true,
                errorMessage: ''
            })
        });
    });

    describe('Test logout', () => {

        const logoutInitialState = {
            user: {
                email: "test@test.com",
                name: 'Test Test'
            },
            isAuthChecked: true,
            errorMessage: ''
        }
        
        it('Should return user data to null', () => {
            const newState = userReducer(logoutInitialState, logout.fulfilled({success: true}, ''))
    
            expect(newState).toEqual({
                user: null,
                isAuthChecked: true,
                errorMessage: ''
            })
        });
    });
})
