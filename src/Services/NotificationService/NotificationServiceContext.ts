import { createContext } from 'react';
import { INotificationServiceState } from './interfaces';

const defaultState: INotificationServiceState = {
    isOpen: false,
};

export const NotificationServiceContext = createContext(defaultState);
