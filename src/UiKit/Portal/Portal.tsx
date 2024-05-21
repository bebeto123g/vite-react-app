import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = (props: PropsWithChildren) => {
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
