import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { coreReducer } from 'Core/Store';
import { apiMiddleware } from 'Store/RSAA';

const rootReducer = combineReducers({
    core: coreReducer,
});

export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false }).concat(apiMiddleware),
        devTools: true,
    });

export type TRootState = ReturnType<typeof rootReducer>;
