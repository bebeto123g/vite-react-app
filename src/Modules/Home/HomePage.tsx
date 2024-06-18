import { useState } from 'react';
import { Button } from '@mui/material';
import ReactLogo from 'Assets/react.svg?react';
import reactLogo from 'Assets/react.svg';
import HomeChildWithAlertState from 'Modules/Home/HomeChildWithAlertState';
import { useNotificationService } from 'Services/NotificationService';
import viteLogo from '/vite.svg';

export const HomePage = () => {
    const [counter, setCounter] = useState(0);
    const createNotification = useNotificationService();

    const Notification = (
        <div>
            <ReactLogo width="22" height="22" fill="white" /> Текст из контекста
        </div>
    );

    return (
        <>
            <ReactLogo width="300" height="300" fill="red" />
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo react" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                    <ReactLogo className="logo react" fill="#00D8FF" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card-react">
                <Button onClick={() => setCounter((count) => count + 1)} variant="contained" color="success">
                    count is {counter}
                </Button>
                <Button
                    onClick={() => {
                        createNotification({
                            content: Notification,
                            variant: 'filled',
                            severity: 'success',
                        });
                    }}
                    variant="contained"
                    color="info"
                >
                    open Notification
                </Button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

            <HomeChildWithAlertState />
        </>
    );
};
