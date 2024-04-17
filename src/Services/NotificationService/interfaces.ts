import { AlertProps, SxProps, Theme } from '@mui/material';

export interface INotificationState {
    severity?: AlertProps['severity'];
    variant?: AlertProps['variant'];
    sx?: SxProps<Theme>;
    isOpen: boolean;
    content: React.ReactNode;
}

export interface INotificationServiceContext {
    createNotification?: (props: Omit<INotificationState, 'isOpen'>) => void;
}
