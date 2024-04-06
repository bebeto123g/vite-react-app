import { AxiosRequestConfig } from 'axios';

/**
 * Параметры запросы
 */
export interface IParams {
    [key: string]: string | number | boolean;
}

/**
 * Дополнительные конфиграции Axios
 */
export interface IAxiosRequestConfig extends Omit<AxiosRequestConfig, 'config'> {}

/**
 * Интерфейс времени ожидания для получения моков через ServiceWrapper
 */
export interface IServiceMockDelay {
    minDelay: number;
    maxDelay: number;
}

/**
 * Интерфейс источник данных для запроса через axios
 *
 * @prop url - Адрес REST
 * @prop [mock] - Путь к моку
 * @prop [forceMock] - Переключение в режим работы с моками
 */
export interface IServiceSource {
    url: string;
    mock?: string;
    forceMock?: boolean;
}

/**
 * Описание типа необходимости вызова нотификации об ошибке на стороне вызова сервиса
 */
export type TErrorNotification<TErrorResult = unknown> = (error: TErrorResult) => void;

/**
 * Описание Колбек симулятора для runtime генерации моков
 */
export type TMockCallbackServiceSimulator<TResponse> = (response: TResponse) => TResponse;

/**
 * @prop source Источник данных
 * @prop [params] Параметры запросы
 * @prop [config] Дополнительные конфиграции Axios
 * @prop [serviceErrorNotification] Необходимость вызова нотификации об ошибке на стороне вызова сервиса
 * @prop [serviceMockDelay] Требуется ли задержка для возврата данных мока
 * @prop [mockCallbackServiceSimulator] Колбек симулятор поведения сервиса, для подмены данных JSON
 */
export interface IRequestProperty<TResponse, TErrorResult = unknown> {
    source: IServiceSource;
    params?: IParams;
    config?: IAxiosRequestConfig;
    serviceErrorNotification?: TErrorNotification<TErrorResult>;
    serviceMockDelay?: boolean | IServiceMockDelay;
    mockCallbackServiceSimulator?: TMockCallbackServiceSimulator<TResponse>;
}

export interface IRequestPropertyWithData<TResponse, TData = unknown, TErrorResult = unknown>
    extends IRequestProperty<TResponse, TErrorResult> {
    data: TData;
}
