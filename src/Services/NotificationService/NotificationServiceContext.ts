import { createContext, useContext } from 'react';
import { INotificationState } from './interfaces';

export const DEFAULT_NOTIFICATION_STATE = {
    isOpen: false,
    content: '',
};

export const NotificationServiceContext = createContext<
    (notification: Omit<INotificationState, 'isOpen'>) => void
>(() => {});

export const NotificationServiceValueContext = createContext<INotificationState>(DEFAULT_NOTIFICATION_STATE);

export const useNotificationService = () => useContext(NotificationServiceContext);
export const useNotificationValue = () => useContext(NotificationServiceValueContext);
