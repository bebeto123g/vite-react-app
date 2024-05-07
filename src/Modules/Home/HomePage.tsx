import { useState } from 'react';
import { Button } from '@mui/material';
import ReactLogo from 'Assets/react.svg?react';
import reactLogo from 'Assets/react.svg';
import { useNotification } from 'Services/NotificationService';
import viteLogo from '/vite.svg';
import Dialog from 'UiKit/Popup/Dialog/Dialog';
import MainPopup from 'UiKit/Popup/MainPopup/MainPopup';

export const HomePage = () => {
    const [counter, setCounter] = useState(0);
    const [isOpenedPopup, setIsOpenedPopup] = useState(false);
    const [isOpenedDialog, setIsOpenedDialog] = useState(false);

    const handleOpenPopup = () => {
        setIsOpenedPopup(true);
    };

    const handleClosePopup = () => {
        setIsOpenedPopup(false);
    };

    const handlePrevArrowPopup = () => {
        console.log('click handlePrevArrowPopup');
    };

    const handleOpenDialog = () => {
        setIsOpenedDialog(true);
    };

    const handleCloseDialog = () => {
        setIsOpenedDialog(false);
    };

    const handleSuccessDialog = () => {
        console.log('click handleSuccessDialog');
        setTimeout(() => {
            setIsOpenedDialog(false);
        }, 1000);
    };

    const createNotification = useNotification();

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

            <div className="container pt-4">
                <div className="row mb-4">
                    <div className="col-2">
                        <button onClick={handleOpenPopup} className="btn btn-info">
                            Open MainPopup
                        </button>
                        <button onClick={handleOpenDialog} className="btn btn-warning mt-2">
                            Open Dialog
                        </button>
                    </div>
                </div>
            </div>

            <MainPopup
                title="Заголовок для MainPopup"
                onPrevArrow={handlePrevArrowPopup}
                onClose={handleClosePopup}
                isOpened={isOpenedPopup}
            >
                <div className="">loremText</div>
            </MainPopup>
            <Dialog
                title="Заголовок Dialog"
                text={'loremText'}
                onClose={handleCloseDialog}
                isOpened={isOpenedDialog}
                actions={[
                    { text: 'Закрыть', onClick: handleCloseDialog },
                    { text: 'Применить', onClick: handleSuccessDialog, className: 'btn-primary' },
                ]}
            />
        </>
    );
};
