import { ENV_CONSTS } from 'Core/Constants';
import { HomePage } from 'Modules/Home';
import { NotificationServiceProvider } from 'Services/NotificationService';
import './App.css';

export const App = () => {
    console.log(ENV_CONSTS);

    return (
        <NotificationServiceProvider>
            <HomePage />
        </NotificationServiceProvider>
    );
};
