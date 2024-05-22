import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { coreReducer } from 'Core/Store';

const rootReducer = combineReducers({
    core: coreReducer,
});

export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
        devTools: true,
    });

export type TRootState = ReturnType<typeof rootReducer>;
