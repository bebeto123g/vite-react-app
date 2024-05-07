import { FC } from 'react';
import FooterPopup, { IDialogFooterActionButton } from '../FooterPopup/FooterPopup';
import HeaderPopup from '../HeaderPopup/HeaderPopup';
import Overlay from '../Overlay/Overlay';

/**
 * @property onClose - функция закрытия диалога
 * @property isOpened - состояие откыт\закрыт диалог
 * @property title - заголовок, без заголовка header рендериться не будет
 * @property text - текст контента диалога
 * @property actions - массив кнопок действий в footer диалога
 * */
interface IDialogProps {
    onClose: () => void;
    isOpened: boolean;
    title?: string;
    text: string;
    actions: Array<IDialogFooterActionButton>;
}

/** @desc Компонент Dialog должен иметь actions для FooterPopup. Может рендериться без заголовка. */
const Dialog: FC<IDialogProps> = (props) => {
    const { isOpened, onClose, title, text, actions } = props;

    return (
        <Overlay isOpened={isOpened} onClose={onClose}>
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    {title && <HeaderPopup onClose={onClose}>{title}</HeaderPopup>}
                    <div className="modal-body">{text}</div>
                    <FooterPopup actions={actions} />
                </div>
            </div>
        </Overlay>
    );
};

export default Dialog;
