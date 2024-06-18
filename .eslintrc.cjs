const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    env: {
        browser: true,
        amd: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended', // Make sure this is always the last element in the array.
    ],
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'import', 'jsx-a11y', 'prettier'],
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/accessible-emoji': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton'],
            },
        ],
        // Одинарные ковычки для строковых переменных
        quotes: [
            'warn',
            'single',
            {
                allowTemplateLiterals: true,
            },
        ],
        'jsx-quotes': ['warn', 'prefer-double'],
        'no-debugger': 'warn',
        'no-console': 'off',
        // Проверка констант
        'prefer-const': 'warn',
        // Не разрешаем больше одной пустой строки
        'no-multiple-empty-lines': 'warn',
        // Убираем бесполезные пробелы
        'no-trailing-spaces': 'warn',
        'max-len': [
            'warn',
            {
                code: 110,
            },
        ],
        // Скобки в стрелочных функциях
        'arrow-parens': ['error', 'always'],
        // Строгие сравнения
        eqeqeq: ['warn', 'always'],
        // Предупреждаем бесполезные вычисления
        'no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true,
                allowTernary: true,
            },
        ],
        // Запятые в конце
        'comma-dangle': [
            'warn',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
        // Сортировка импортов, но вырубаем сортировку строк импортов, этим занимается правило import/order
        'sort-imports': [
            1,
            {
                ignoreDeclarationSort: true,
            },
        ],
        // ; в конце
        semi: 'warn',
        // Пустая строка в конце файла
        'eol-last': 'warn',
        // Выключаем высшее зло
        'no-eval': 'error',
        // Зацикливание
        'import/no-cycle': 'off',
        // Пустая строка после импортов
        'import/newline-after-import': 'warn',
        'import/order': [
            'warn',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: 'react-dom/client',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: 'react-dom',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: 'react-router-dom',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@testing-library/react',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@testing-library/user-event',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@reduxjs/toolkit',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: 'react-redux',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: 'react-transition-group',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@mui',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@mui/material',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@mui/icons-material',
                        group: 'external',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['react'],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        // Не требовать импорт реакта в scope
        'react/jsx-uses-react': 'off',
        'react/display-name': 'off',
        'react/jsx-uses-vars': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        // Разрешаем неиспользуемые _ переменные и rest операторы
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'warn',
        // Исправление конфликта no-shadow
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'warn',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                camelcase: 'off',
                '@typescript-eslint/naming-convention': [
                    'error',
                    // Данные по умолчанию
                    {
                        selector: 'default',
                        format: ['PascalCase', 'camelCase', 'snake_case'],
                    },
                    // Все классы через PascalCase
                    {
                        selector: 'class',
                        format: ['PascalCase'],
                    },
                    {
                        selector: 'classMethod',
                        format: ['camelCase', 'UPPER_CASE'],
                        leadingUnderscore: 'allow',
                    },
                    // Функции через camelCase, исключение функциональные компоненты
                    {
                        selector: 'function',
                        format: ['camelCase', 'PascalCase'],
                    },
                    // Все параметры всех функций через camelCase или PascalCase
                    {
                        selector: 'parameter',
                        format: ['camelCase', 'PascalCase'],
                        leadingUnderscore: 'allow',
                    },
                    // Все пропсы всех объектов, интерфейсов
                    {
                        selector: 'property',
                        format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
                        leadingUnderscore: 'allow',
                    },
                    {
                        selector: 'objectLiteralProperty',
                        format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
                        leadingUnderscore: 'allow',
                    },
                    // Переменные
                    {
                        selector: 'variable',
                        format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
                    },
                    // Все интерфейсы строго с I
                    {
                        selector: 'interface',
                        format: ['PascalCase'],
                        custom: {
                            regex: '^I[A-Z]',
                            match: true,
                        },
                    },
                    // Все типы строго с T
                    {
                        selector: 'typeAlias',
                        format: ['PascalCase'],
                        custom: {
                            regex: '^T[A-Z]',
                            match: true,
                        },
                    },
                    // Все типы строго с T для дженериков и прочего
                    {
                        selector: 'typeParameter',
                        format: ['PascalCase'],
                        prefix: ['T'],
                    },
                    // Все Enum строго с E
                    {
                        selector: 'enum',
                        format: ['PascalCase'],
                        custom: {
                            regex: '^E[A-Z]',
                            match: true,
                        },
                    },
                    // Все элементы Enum прописывать через UPPER_CASE
                    {
                        selector: 'enumMember',
                        format: ['UPPER_CASE'],
                    },
                ],
            },
        },
    ],
});
