import { FC, ReactNode } from 'react';
import { classnames } from 'Core/Utils';

export interface IHeaderPopupProps {
    onClose: () => void;
    onPrevArrow?: () => void;
    children: ReactNode;
}

const HeaderPopup: FC<IHeaderPopupProps> = (props) => {
    const { onClose, onPrevArrow, children } = props;

    const titleClassName: string = classnames({
        ['modal-title']: true,
        ['mx-4']: !!onPrevArrow,
    });

    return (
        <div className="modal-header">
            {onPrevArrow && (
                <button onClick={onPrevArrow} className="btn btn-sm" aria-label="Prev">
                    &#8617;
                </button>
            )}
            <h5 className={titleClassName}>{children}</h5>
            <button onClick={onClose} className="btn-close" aria-label="Close" />
        </div>
    );
};

export default HeaderPopup;
