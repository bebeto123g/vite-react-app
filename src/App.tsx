import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

export const App = () => {
    const [counter, setCounter] = useState(0);

    console.log({
        counter,
        APP_TITLE,
        VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
        DEVELOP_TITLE,
        VITE_TEST_TITLE: import.meta.env.VITE_TEST_TITLE,
        TEST_TITLE,
        VITE_DEVELOP_TITLE: import.meta.env.VITE_DEVELOP_TITLE,
        PRODUCT_TITLE,
        VITE_PRODUCT_TITLE: import.meta.env.VITE_PRODUCT_TITLE,
        dev: import.meta.env.DEV,
        url: import.meta.env.BASE_URL,
        mode: import.meta.env.MODE,
    });

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCounter((count) => count + 1)}>count is {counter}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
    );
};
