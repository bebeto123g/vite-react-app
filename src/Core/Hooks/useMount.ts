import { useEffect, useState } from 'react';

export const ANIMATION_POPUP_TIME = 300;

interface IUseMountReturn {
    isMounted: boolean;
    isAnimationIn: boolean;
}

export const useMount = (isOpened: boolean): IUseMountReturn => {
    const [isMounted, setIsMounted] = useState(false);
    const [isAnimationIn, setIsAnimationIn] = useState(false);

    useEffect(() => {
        if (isOpened && !isMounted) {
            setIsMounted(true);
        } else if (!isOpened && isMounted) {
            setTimeout(() => {
                setIsMounted(false);
            }, ANIMATION_POPUP_TIME);
        }

        setIsAnimationIn(isMounted && isOpened);
    }, [isOpened, isMounted]);

    return { isMounted, isAnimationIn };
};
