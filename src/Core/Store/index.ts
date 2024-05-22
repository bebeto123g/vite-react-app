import { Action, createAction, createReducer } from '@reduxjs/toolkit';

interface ICoreState {
    dialog: string | null;
}

export const CoreInitialState: ICoreState = {
    dialog: null,
};

export const openDialogAction = createAction<string>('CORE_OPEN_DIALOG');
export const closeDialogAction = createAction('CORE_CLOSE_DIALOG');

export const syncDialogReducer = createReducer(CoreInitialState.dialog, (builder) => {
    builder
        .addCase(openDialogAction, (_state, action) => action.payload)
        .addCase(closeDialogAction, (_state, _action) => null);
});

export const coreReducer = (state = CoreInitialState, action: Action): ICoreState => ({
    dialog: syncDialogReducer(state.dialog, action),
});
