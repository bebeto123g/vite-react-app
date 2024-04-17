import { createContext, useContext } from 'react';
import { INotificationState } from './interfaces';

export const NotificationServiceContext = createContext<
    (notification: Omit<INotificationState, 'isOpen'>) => void
>(() => {});

export const useNotification = () => useContext(NotificationServiceContext);
