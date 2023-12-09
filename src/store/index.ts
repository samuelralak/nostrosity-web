import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userApi} from "@/api";
import identifierApi from "@/api/identifier";


const store = configureStore({
    reducer: combineReducers({
        [userApi.reducerPath]: userApi.reducer,
        [identifierApi.reducerPath]: identifierApi.reducer
    }),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            }
        }).concat([userApi.middleware, identifierApi.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
