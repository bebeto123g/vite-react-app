import { Provider } from 'react-redux';
import { HomePage } from 'Modules/Home';
import { NotificationServiceProvider } from 'Services/NotificationService';
import { setupStore } from 'Store';
import 'Styles/common.scss';

const store = setupStore();

export const App = () => {
    return (
        <Provider store={store}>
            <NotificationServiceProvider>
                <HomePage />
            </NotificationServiceProvider>
        </Provider>
    );
};
