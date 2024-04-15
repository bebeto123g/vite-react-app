/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_DEVELOP_TITLE: string | undefined;
    readonly VITE_PRODUCT_TITLE: string | undefined;
    readonly VITE_TEST_TITLE: string | undefined;

    readonly VITE_PUBLIC_PATH: string | undefined;
    readonly VITE_REST_ACTIVE: string | undefined;
    // more env variables...
}

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ImportMeta {
    readonly env: ImportMetaEnv;
}

/**
 * Заголовки для тестовых сред
 */
declare const APP_TITLE: string;
declare const DEVELOP_TITLE: string | undefined;
declare const PRODUCT_TITLE: string | undefined;
declare const TEST_TITLE: string | undefined;

/**
 * Корень запросов приложения
 * */
declare const PUBLIC_PATH: string;

/**
 * Используем rest-запросы или моки
 * */
declare const REST_ACTIVE: boolean;
