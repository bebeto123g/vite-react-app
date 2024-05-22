import { Action } from '@reduxjs/toolkit';
import { syncDialogReducer } from './DialogState';

interface ICoreState {
    dialog: string | null;
}

export const CoreInitialState: ICoreState = {
    dialog: null,
};

export const coreReducer = (state = CoreInitialState, action: Action): ICoreState => ({
    dialog: syncDialogReducer(state.dialog, action),
});
