import { useState } from 'react';
import { useNotificationValue } from 'Services/NotificationService/NotificationServiceContext.ts';
import Dialog from 'UiKit/Popup/Dialog/Dialog.tsx';
import MainPopup from 'UiKit/Popup/MainPopup/MainPopup.tsx';

const HomeChildWithAlertState = () => {
    const [isOpenedPopup, setIsOpenedPopup] = useState(false);
    const [isOpenedDialog, setIsOpenedDialog] = useState(false);

    const notification = useNotificationValue(); // просто для теста

    console.log('HomeChildWithAlertState render', { notification });

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

    return (
        <>
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

export default HomeChildWithAlertState;
