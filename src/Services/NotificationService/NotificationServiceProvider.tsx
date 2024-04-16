import { FunctionComponent, PropsWithChildren, useState } from 'react';
import { INotificationServiceState } from './interfaces';
import { NotificationServiceContext } from './NotificationServiceContext';

export const NotificationServiceProvider: FunctionComponent<PropsWithChildren> = (props) => {
    const { children } = props;
    const [state] = useState<INotificationServiceState>({ isOpen: false });

    return (
        <NotificationServiceContext.Provider value={state}>{children}</NotificationServiceContext.Provider>
    );
};
