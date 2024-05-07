import { RefObject, useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = <TElement extends Element>(
    options: IntersectionObserverInit = {}
): [RefObject<TElement>, boolean] => {
    const containerRef = useRef<TElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const callback = (entries: Array<IntersectionObserverEntry>) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    useEffect(() => {
        const containerRefCurrent = containerRef.current;
        const observer = new IntersectionObserver(callback, options);
        if (containerRefCurrent) {
            observer.observe(containerRefCurrent);
        }

        return () => {
            if (containerRefCurrent) {
                observer.unobserve(containerRefCurrent);
            }
        };
    }, [containerRef, options]);

    return [containerRef, isVisible];
};
