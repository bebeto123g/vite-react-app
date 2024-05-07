import { ChangeEventHandler, FC, InputHTMLAttributes, KeyboardEventHandler, useState } from 'react';

interface ISearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onSearch: (value: string) => void;
    label?: string;
    id: string;
    buttonText: string;
}

const SearchInput: FC<ISearchInputProps> = (props) => {
    const { onSearch, label, id, buttonText, ...otherProps } = props;

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        onSearch(searchValue);
    };

    const onPressEnter: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.code !== 'Enter') return;
        onSearch(searchValue);
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const { value } = event.target as HTMLInputElement;
        if (!value) onSearch('');
        setSearchValue(value);
    };

    return (
        <div className="mb-3 d-flex align-items-end gap-3">
            <div className="flex-grow-1">
                {label && (
                    <label htmlFor={id} className="form-label">
                        {label}
                    </label>
                )}
                <input
                    id={id}
                    className="form-control"
                    type="search"
                    value={searchValue}
                    onKeyDown={onPressEnter}
                    onChange={handleChange}
                    {...otherProps}
                />
            </div>
            <button className="btn btn-primary" onClick={handleSearch}>
                {buttonText}
            </button>
        </div>
    );
};

export default SearchInput;
