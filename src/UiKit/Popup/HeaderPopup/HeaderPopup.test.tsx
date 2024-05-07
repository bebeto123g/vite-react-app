import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderPopup from './HeaderPopup';

const onClose = vi.fn();
const onPrevArrow = vi.fn();

/** &#8617; - onPrevArrow text */
describe('HeaderPopup component', () => {
    /** Рендерим без функции onPrevArrow, првоерям наличие заголовка и кнопки Close */
    test('render HeaderPopup component without onPrevArrow', () => {
        render(<HeaderPopup onClose={onClose}>HeaderPopup test text</HeaderPopup>);

        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(screen.getByText(/HeaderPopup test text/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Close/i)).toBeInTheDocument();
    });

    /** Рендерим без функции onPrevArrow, првоерям действие onClose по клику на кнопку Close */
    test('render HeaderPopup component click to Close', () => {
        render(<HeaderPopup onClose={onClose}>HeaderPopup test text</HeaderPopup>);

        userEvent.click(screen.getByLabelText(/Close/i));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    /** Рендерим с функцией onPrevArrow, првоерям наличие и выполнение функции при клике по ней */
    test('render HeaderPopup component with click onPrevArrow', () => {
        render(
            <HeaderPopup onClose={onClose} onPrevArrow={onPrevArrow}>
                HeaderPopup test text
            </HeaderPopup>
        );

        expect(screen.getByLabelText(/Prev/i)).toBeInTheDocument();
        userEvent.click(screen.getByLabelText(/Prev/i));
        expect(onPrevArrow).toHaveBeenCalledTimes(1);
    });

    /** Рендерим с функцией onPrevArrow, првоерям наличие класса mx-4 у заголовка */
    test('render HeaderPopup component with click onPrevArrow', () => {
        render(
            <HeaderPopup onClose={onClose} onPrevArrow={onPrevArrow}>
                HeaderPopup test text
            </HeaderPopup>
        );

        expect(screen.getByRole('heading')).toHaveClass('mx-4');
    });
});
