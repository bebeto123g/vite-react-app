import { FC, ReactNode } from 'react';
import HeaderPopup from '../HeaderPopup/HeaderPopup';
import Overlay from '../Overlay/Overlay';

interface IMainPopupProps {
    title: ReactNode;
    onClose: () => void;
    onPrevArrow: () => void;
    isOpened: boolean;
    children: ReactNode;
}

const MainPopup: FC<IMainPopupProps> = (props) => {
    const { title, isOpened, onClose, onPrevArrow, children } = props;

    return (
        <Overlay isOpened={isOpened} onClose={onClose}>
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <HeaderPopup onClose={onClose} onPrevArrow={onPrevArrow}>
                        {title}
                    </HeaderPopup>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </Overlay>
    );
};

export default MainPopup;
