import { EMimeTypes } from 'Core/Enums';
import {
    DEFAULT_DOWNLOAD_FILE_TRUSTED_CONTENT_TYPES,
    ERestMethod,
    IRequestProperty,
    IRequestPropertyWithData,
    axiosRequest,
} from 'Services/AxiosService';

/** REGEX для парсинга имени файла из заголовка */
const FILENAME_REGEX = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

/** Метод безопасного вызова revokeObjectURL */
const deleteBlobURL = (downloadURL: string) => {
    setTimeout(() => {
        window.URL.revokeObjectURL(downloadURL);
    }, 0);
};
/**
 * Скачать файл методом POST или запросить мок файл
 *
 * @param property Параметры формируемого запроса
 * @param [trustedContentType] Доверенные contentType
 */
export const downloadFile = async <TData = unknown>(
    property: IRequestProperty<BlobPart> | IRequestPropertyWithData<BlobPart, TData>,
    trustedContentTypes: EMimeTypes[] = DEFAULT_DOWNLOAD_FILE_TRUSTED_CONTENT_TYPES
): Promise<void> => {
    const { headers, data } = await axiosRequest<BlobPart>(ERestMethod.POST, {
        ...property,
        config: {
            responseType: 'blob',
            ...(property?.config || {}),
        },
    });

    const contentType = headers['Content-Type'] as EMimeTypes;

    if (!data || !trustedContentTypes.includes(contentType)) {
        return;
    }

    const downloadLink = document.createElement('a');
    const blob = new Blob([data], { type: contentType });
    const downloadUrl = window.URL.createObjectURL(blob);

    /** Для старых браузеров */
    if (typeof downloadLink.download === 'undefined') {
        window.open(downloadUrl, '_blank', '');
        deleteBlobURL(downloadUrl);
        return;
    }

    /** В заголовке приходит имя файла */
    const disposition: string | undefined = headers['content-disposition'];
    let filename = 'attachment';

    if (disposition?.includes('attachment')) {
        const matches = FILENAME_REGEX.exec(disposition);

        if (matches?.[1]) {
            filename = matches[1].replace(/['"]/g, '');
        }
    }

    downloadLink.href = downloadUrl;
    downloadLink.download = filename;
    downloadLink.click();
    deleteBlobURL(downloadUrl);
};
