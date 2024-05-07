import { FC, PropsWithChildren, useCallback, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { INotificationState } from './interfaces';
import { NotificationServiceContext } from './NotificationServiceContext';

export const NotificationServiceProvider: FC<PropsWithChildren> = (props) => {
    const { children } = props;
    const [state, setState] = useState<INotificationState>({ isOpen: false, content: '' });

    const createNotification = useCallback((notification: Omit<INotificationState, 'isOpen'>) => {
        setState({ ...notification, isOpen: true });
    }, []);

    const closeNotification = () => {
        setState((prev) => ({
            isOpen: false,
            content: prev.content,
        }));
    };

    return (
        <NotificationServiceContext.Provider value={createNotification}>
            <Snackbar
                open={state.isOpen}
                autoHideDuration={5000}
                // onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={closeNotification}
                    severity={state.severity || 'info'}
                    variant={state.variant || 'filled'}
                    sx={{ width: '100%', ...(state.sx || {}) }}
                >
                    {state.content || ''}
                </Alert>
            </Snackbar>
            {children}
        </NotificationServiceContext.Provider>
    );
};
