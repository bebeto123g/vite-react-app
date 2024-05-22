import { createAction, createReducer } from '@reduxjs/toolkit';
import { CoreInitialState } from './';

export const openDialogAction = createAction<string>('CORE_OPEN_DIALOG');
export const closeDialogAction = createAction('CORE_CLOSE_DIALOG');

export const syncDialogReducer = createReducer(CoreInitialState.dialog, (builder) => {
    builder
        .addCase(openDialogAction, (_state, action) => action.payload)
        .addCase(closeDialogAction, (_state, _action) => null);
});
