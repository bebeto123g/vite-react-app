import { EMimeTypes } from 'Core/Enums';
import { IServiceMockDelay } from 'Core/Services/AxiosService';

/**
 * Разрешенные contentTypes для загрузки файлов по умолчанию
 */
export const DEFAULT_DOWNLOAD_FILE_TRUSTED_CONTENT_TYPES: EMimeTypes[] = [
    /** Документы */
    EMimeTypes.AXML,
    EMimeTypes.DOC,
    EMimeTypes.DOCX,
    EMimeTypes.XLS,
    EMimeTypes.XLSX,
    EMimeTypes.TXT,
    EMimeTypes.PDF,
    EMimeTypes.PPT,
    EMimeTypes.PPTX,

    /** Картинки */
    EMimeTypes.PNG,
    EMimeTypes.JPEG,
    EMimeTypes.GIF,
];

/**
 * Разрешенные contentTypes для загрузки файлов по умолчанию
 */
export const DEFAULT_SERVICE_MOCK_DELAY: IServiceMockDelay = {
    minDelay: 500,
    maxDelay: 1000,
};
