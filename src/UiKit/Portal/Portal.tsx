import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IPortalProps {
    children: ReactNode;
}

const Portal = (props: IPortalProps) => {
    const [container] = useState(() => document.createElement('div'));

    useEffect(() => {
        document.body.appendChild(container);

        return () => {
            document.body.removeChild(container);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return createPortal(props.children, container);
};

export default Portal;
