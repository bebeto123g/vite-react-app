import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './SearchInput';

const onSearch = vi.fn();

describe('SearchInput component', () => {
    test('renders SearchInput component', () => {
        render(<SearchInput onSearch={onSearch} id="test" label="Search" buttonText="Find" />);

        expect(screen.getByText(/find/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    });

    test('renders SearchInput without label', () => {
        render(<SearchInput onSearch={onSearch} id="test" buttonText="Find" />);

        expect(screen.queryByLabelText(/search/i)).toBeNull();
    });

    test('onSearch from button Find', () => {
        render(<SearchInput onSearch={onSearch} id="test" buttonText="Find" />);

        /** Ищем поле search, вводим "JavaScript" и кликаем на кнопку find */
        userEvent.type(screen.getByRole('searchbox'), 'JavaScript');
        userEvent.click(screen.getByText(/find/i));

        /** Сколько раз была вызвана функция */
        expect(onSearch).toHaveBeenCalledTimes(1);
    });

    test('onSearch to type Enter', () => {
        render(<SearchInput onSearch={onSearch} id="test" buttonText="Find" />);

        const search = screen.getByRole('searchbox');

        /** Ищем поле search, вводим "JavaScript" и нажимаем Enter*/
        userEvent.type(search, 'JavaScript');
        userEvent.type(search, '{enter}');

        /** Сколько раз была вызвана функция */
        expect(onSearch).toHaveBeenCalledTimes(1);
    });
});
