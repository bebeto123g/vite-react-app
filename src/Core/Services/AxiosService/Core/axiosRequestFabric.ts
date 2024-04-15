import axios, { AxiosError, AxiosResponse } from 'axios';
import { IErrorsResult, IServerErrorsResult } from 'Core/Models';
import {
    ERestMethod,
    IRequestProperty,
    IRequestPropertyWithData,
    axiosRequest,
} from 'Core/Services/AxiosService';

/**
 * Выясняем есть ли необходимость вызывать моки
 *
 * @param requestProperty Параметры запроса
 */
export const transformRequestPropertyForRestActive = <
    TResponse,
    TData = unknown,
    TRequestPropperty extends
        | IRequestProperty<TResponse, IErrorsResult>
        | IRequestPropertyWithData<TResponse, TData, IErrorsResult> = IRequestPropertyWithData<
        TResponse,
        TData,
        IErrorsResult
    >,
>(
    requestProperty: TRequestPropperty
): TRequestPropperty => ({
    ...requestProperty,
    config: {
        ...(requestProperty?.config || null),
    },
    source: {
        ...requestProperty.source,
        forceMock: requestProperty.source.forceMock || !REST_ACTIVE,
    },
});

/**
 * Обработка ошибки при запросе данных cleanRequestError
 *
 * @param axiosError Информация об ошибке
 */
const processingRequestError = (axiosError: AxiosError<IServerErrorsResult>): IErrorsResult => {
    const isAbortError = axios.isCancel(axiosError);
    const timestamp = String(Date.now());

    if (axiosError.response) {
        const { status, data } = axiosError.response;

        return {
            httpCode: status,
            timestamp,
            isAbortError,
            ...(typeof data === 'object' ? data : null),
        };
    }

    return {
        httpCode: -1,
        timestamp,
        isAbortError,
        errors: [],
    };
};

/**
 * Создатель обработчика показа уведомлений об ошибке
 *
 * @param requestProperty Параметры запроса
 */
const getHandleShowErrorNotification =
    <TResponse, TData = unknown, TErrorResult = unknown>(
        requestProperty:
            | IRequestProperty<TResponse, TErrorResult>
            | IRequestPropertyWithData<TResponse, TData, TErrorResult>
    ) =>
    /**
     * Обработчик показа уведомления об ошибке
     *
     * @param error Информация об ошибке
     */
    (error: TErrorResult) => {
        if (
            requestProperty.serviceErrorNotification &&
            typeof requestProperty.serviceErrorNotification === 'function'
        ) {
            requestProperty.serviceErrorNotification(error);
        }

        throw error;
    };

/**
 * Обертка над промисом axios, служит для избавления от ненужного мусора при запросах
 *
 * @param axiosPromise Возвращаемый axios промис
 */
const cleanAxiosPromise = <TResponse = unknown>(
    axiosPromise: Promise<AxiosResponse<TResponse>>
): Promise<TResponse> =>
    axiosPromise
        .then((axiosResponse) => axiosResponse.data)
        .catch((axiosError) => {
            throw processingRequestError(axiosError);
        });

/**
 * Основная обертка запроса фабрики сервиса
 *
 * @param method Метод запроса
 * @param requestProperty Параметры запроса
 */
const requestAxios = <TResponse, TData = unknown, TErrorResult = unknown>(
    method: ERestMethod,
    requestProperty:
        | IRequestProperty<TResponse, TErrorResult>
        | IRequestPropertyWithData<TResponse, TData, TErrorResult>
): Promise<TResponse> =>
    cleanAxiosPromise<TResponse>(axiosRequest<TResponse, TData, TErrorResult>(method, requestProperty)).catch(
        getHandleShowErrorNotification(requestProperty)
    );

/**
 * Фабрика генерации методов запросов
 */
export const axiosRequestFabric = <TErrorResult = unknown>() => {
    /**
     * Отправить данные методом POST или запросить моки
     *
     * @param requestProperty Параметры запроса
     */
    const POST = <TResponse, TData = unknown>(
        requestProperty: IRequestPropertyWithData<TResponse, TData, TErrorResult>
    ): Promise<TResponse> => requestAxios<TResponse, TData, TErrorResult>(ERestMethod.POST, requestProperty);

    /**
     * Отправить данные методом GET или запросить моки
     *
     * @param requestProperty Параметры запроса
     */
    const GET = <TResponse>(requestProperty: IRequestProperty<TResponse, TErrorResult>): Promise<TResponse> =>
        requestAxios<TResponse, null, TErrorResult>(ERestMethod.GET, requestProperty);

    /**
     * Отправить данные методом DELETE или запросить моки
     *
     * @param requestProperty Параметры запроса
     */
    const DELETE = <TResponse, TData = unknown>(
        requestProperty:
            | IRequestProperty<TResponse, TErrorResult>
            | IRequestPropertyWithData<TResponse, TData, TErrorResult>
    ): Promise<TResponse> =>
        requestAxios<TResponse, TData, TErrorResult>(ERestMethod.DELETE, requestProperty);

    /**
     * Отправить данные методом PATCH или запросить моки
     *
     * @param requestProperty Параметры запроса
     */
    const PATCH = <TResponse, TData = unknown>(
        requestProperty: IRequestPropertyWithData<TResponse, TData, TErrorResult>
    ): Promise<TResponse> => requestAxios<TResponse, TData, TErrorResult>(ERestMethod.PATCH, requestProperty);

    /**
     * Отправить данные методом PUT или запросить моки
     *
     * @param requestProperty Параметры запроса
     */
    const PUT = <TResponse, TData = unknown>(
        requestProperty: IRequestPropertyWithData<TResponse, TData, TErrorResult>
    ): Promise<TResponse> => requestAxios<TResponse, TData, TErrorResult>(ERestMethod.PUT, requestProperty);

    return { POST, GET, DELETE, PATCH, PUT };
};
