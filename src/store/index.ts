import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {baseApi, userApi} from "@/api";
import identifierApi from "@/api/identifier";
import sessionReducer, {preloadSession} from "@/store/reducers/session-reducer";
import {sessionListenerMiddleware} from "@/store/middlewares/session-middleware";

const preloadedSession = preloadSession()

const store = configureStore({
    preloadedState: {
        session: preloadedSession,
    },
    reducer: combineReducers({
        session: sessionReducer,
        [baseApi.reducerPath]: baseApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [identifierApi.reducerPath]: identifierApi.reducer
    }),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            }
        }).concat([userApi.middleware, identifierApi.middleware, sessionListenerMiddleware.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
