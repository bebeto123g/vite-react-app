import { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ANIMATION_POPUP_TIME, useMount } from 'Core/Hooks/useMount';
import Portal from '../../Portal/Portal';
import styles from './Overlay.module.scss';

interface IOverlayProps {
    onClose: () => void;
    isOpened: boolean;
}

const Overlay: FC<PropsWithChildren<IOverlayProps>> = (props) => {
    const { children, isOpened, onClose } = props;
    const { isMounted, isAnimationIn } = useMount(isOpened);

    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpened) {
            document.body.classList.add('overflow-body');
        }
        return () => {
            document.body.classList.remove('overflow-body');
        };
    }, [isOpened]);

    if (!isMounted) return null;

    return (
        <Portal>
            <div className={styles.container}>
                <CSSTransition
                    nodeRef={overlayRef}
                    timeout={ANIMATION_POPUP_TIME}
                    mountOnEnter
                    unmountOnExit
                    classNames={{
                        enter: styles.overlayEnter,
                        enterActive: styles.overlayEnterActive,
                        exit: styles.overlayExit,
                        exitActive: styles.overlayExitActive,
                    }}
                    in={isAnimationIn}
                >
                    <div ref={overlayRef} className={styles.overlay} onClick={onClose} role="presentation" />
                </CSSTransition>
                <CSSTransition
                    nodeRef={contentRef}
                    timeout={ANIMATION_POPUP_TIME}
                    mountOnEnter
                    unmountOnExit
                    classNames={{
                        enter: styles.contentEnter,
                        enterActive: styles.contentEnterActive,
                        exit: styles.contentExit,
                        exitActive: styles.contentExitActive,
                    }}
                    in={isAnimationIn}
                >
                    <div className={styles.content} ref={contentRef}>
                        {children}
                    </div>
                </CSSTransition>
            </div>
        </Portal>
    );
};

export default Overlay;
