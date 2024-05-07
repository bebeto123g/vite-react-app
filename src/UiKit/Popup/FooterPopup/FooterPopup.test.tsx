import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FooterPopup from './FooterPopup';

const handleClickAction = vi.fn();

const actions = {
    withClass: [{ text: 'Применить', onClick: handleClickAction, className: 'btn-primary' }],
    withoutClass: [{ text: 'Закрыть', onClick: handleClickAction }],
    empty: [],
};

describe('FooterPopup component', () => {
    /** Рендерим с className, проверяем наличие класса и событие клика */
    test('render FooterPopup component with className', () => {
        render(<FooterPopup actions={actions.withClass} />);

        expect(screen.getByLabelText(/FooterPopup/i)).toBeInTheDocument();

        const button = screen.getByRole('button');

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('btn-primary');

        userEvent.click(button);
        expect(handleClickAction).toHaveBeenCalledTimes(1);
    });

    /** Рендерим без className, проверяем наличие дефолтного класса и событие клика */
    test('render FooterPopup component without className', () => {
        render(<FooterPopup actions={actions.withoutClass} />);

        expect(screen.getByLabelText(/FooterPopup/i)).toBeInTheDocument();

        const button = screen.getByRole('button');

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('btn-outline-secondary');

        userEvent.click(button);
        expect(handleClickAction).toHaveBeenCalledTimes(1);
    });

    /** Рендерим c пустыми пропсами и смотрим что будет нулл */
    test('render FooterPopup component empty data', () => {
        render(<FooterPopup actions={actions.empty} />);
        expect(screen.queryByLabelText(/FooterPopup/i)).toBeNull();
    });
});
