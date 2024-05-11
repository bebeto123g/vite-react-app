import { createContext, useContext } from 'react';
import { INotificationState } from './interfaces';

export const NotificationServiceContext = createContext<
    (notification: Omit<INotificationState, 'isOpen'>) => void
>(() => {});

export const NotificationServiceValueContext = createContext<INotificationState>({
    isOpen: false,
    content: '',
});

export const useNotificationService = () => useContext(NotificationServiceContext);
export const useNotificationValue = () => useContext(NotificationServiceValueContext);
