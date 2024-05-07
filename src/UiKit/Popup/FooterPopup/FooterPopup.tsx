import { FC } from 'react';

export interface IDialogFooterActionButton {
    text: string;
    onClick: () => void;
    className?: string;
}

interface IFooterPopupProps {
    actions: Array<IDialogFooterActionButton>;
}

const FooterPopup: FC<IFooterPopupProps> = (props) => {
    const { actions } = props;

    if (!actions.length) return null;

    return (
        <div className="modal-footer" aria-label="FooterPopup">
            {actions.map(({ text, onClick, className }) => (
                <button
                    className={`btn ${className || 'btn-outline-secondary'}`}
                    onClick={onClick}
                    key={text}
                >
                    {text}
                </button>
            ))}
        </div>
    );
};

export default FooterPopup;
