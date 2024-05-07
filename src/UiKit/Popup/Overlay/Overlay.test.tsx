import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Overlay from './Overlay';

const onClose = vi.fn();

const OverlayTest = ({ isOpened }: { isOpened: boolean }) => {
    return (
        <Overlay onClose={onClose} isOpened={isOpened}>
            <span>Overlay test</span>
        </Overlay>
    );
};

describe('Overlay component', () => {
    test('open Overlay component', () => {
        render(<OverlayTest isOpened={true} />);
        expect(screen.getByText(/Overlay test/i)).toBeInTheDocument();
        userEvent.click(screen.getByText(/Overlay test/i), {
            // @ts-ignore
            ctrlKey: true,
        });
        expect(onClose).toBeCalledTimes(0);
        userEvent.click(screen.getByRole('overlay'));
        expect(onClose).toBeCalledTimes(1);
        expect(screen.queryByText(/Overlay test/i)).toBeNull();
    });

    test('close Overlay component', () => {
        render(<OverlayTest isOpened={false} />);
    });
});
