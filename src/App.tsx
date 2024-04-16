import { useState } from 'react';
import { Button } from '@mui/material';
import reactLogo from './Assets/react.svg';
import viteLogo from '/vite.svg';
import { SnackbarNotification } from './Common/Notification';
import { ENV_CONSTS } from './Core/Constants';
import './App.css';

export const App = () => {
    const [counter, setCounter] = useState(0);

    console.log(ENV_CONSTS);

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo react" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <Button onClick={() => setCounter((count) => count + 1)} variant="contained" color="success">
                    count is {counter}
                </Button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
            <SnackbarNotification />
        </>
    );
};
