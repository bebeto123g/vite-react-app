import { UnknownAction } from '@reduxjs/toolkit';
import {
    IAxiosRequestConfig,
    IServiceMockDelay,
    IServiceSource,
    TErrorNotification,
    TParams,
    TRestMayHaveData,
    TRestWithData,
    TRestWithoutData,
} from 'Services/AxiosService';
import { CALL_REDUX_API_MIDDLEWARE } from './constants';

/**
 * Интерфейс свойства options ддля RSAA в соответствии с запросом без request body
 *
 * @prop method rest-метод
 */
export interface IRSAAOptions {
    method: TRestWithoutData;
}

/**
 * Интерфейс свойства options ддля RSAA в соответствии с запросом с request body
 *
 * @prop method rest-метод
 * @prop body тело запроса
 */
export interface IRSAAOptionsWithRequestData<TData> {
    method: TRestWithData;
    body: TData;
}

/**
 * Интерфейс свойства options ддля RSAA в соответствии с запросом с ~request body
 *
 * @prop method rest-метод
 * @prop [body] тело запроса
 */
export interface IRSAAOptionsMayHaveRequestData<TData> {
    method: TRestMayHaveData;
    body?: TData;
}

/**
 * Интерфейс передаваемых в middleware свойств RSAA
 *
 * @prop source источник данных
 * @prop type тип редюсера
 * @prop [params] параметры запроса
 * @prop [config] дополнительные конфигурации запроса
 * @prop [payload] опциональные данные, которые требуется прокинуть при старте
 * @prop [serviceErrorNotification] вызов уведомления об ошибке на стороне вызова сервиса
 * @prop [serviceMockDelay] задержка возврата данных мока
 * @prop [mockCallbackServiceSimulator] колбек, мутирующий моки перед возвратом из сервиса
 */
export interface IRSAACommonProps<TResponse, TBeginPayload = unknown> {
    source: IServiceSource;
    type: string;
    params?: TParams;
    config?: IAxiosRequestConfig;
    payload?: TBeginPayload;
    serviceErrorNotification?: TErrorNotification;
    serviceMockDelay?: boolean | IServiceMockDelay;
    mockCallbackServiceSimulator?: (response?: TResponse) => TResponse;
}

/**
 * Интерфейс передаваемых в middleware свойств RSAA
 *
 * @prop options дополнительные запросы rest-запроса, включающие body request и его метод
 */
export interface IRSAAProps<TResponse, TBeginPayload = unknown>
    extends IRSAACommonProps<TResponse, TBeginPayload> {
    options: IRSAAOptions;
}

/**
 * Интерфейс передаваемых в middleware свойств RSAA
 *
 * @prop options дополнительные запросы rest-запроса, включающие body request и его метод
 */
export interface IRSAAPropsWithData<TResponse, TData, TBeginPayload = unknown>
    extends IRSAACommonProps<TResponse, TBeginPayload> {
    options: IRSAAOptionsWithRequestData<TData>;
}

/**
 * Интерфейс передаваемых в middleware свойств RSAA
 *
 * @prop options дополнительные запросы rest-запроса, включающие body request и его метод
 */
export interface IRSAAPropsMayHaveData<TResponse, TData, TBeginPayload = unknown>
    extends IRSAACommonProps<TResponse, TBeginPayload> {
    options?: IRSAAOptionsMayHaveRequestData<TData>;
}

/**
 * Интерфейс передаваемых свойств для создания объекта RSAA без payload
 *
 * @prop options дополнительные запросы rest-запроса, включающие body request и его метод
 */
export interface IRSAAFabricProps<TResponse, TData = unknown>
    extends Omit<IRSAACommonProps<TResponse, unknown>, 'payload'> {
    options: IRSAAOptions | IRSAAOptionsWithRequestData<TData> | IRSAAOptionsMayHaveRequestData<TData>;
}

/**
 * Интерфейс свойств объекта RSAA
 */
export interface IRSAA<TResponse, TBeginPayload = unknown> {
    [CALL_REDUX_API_MIDDLEWARE]: IRSAAProps<TResponse, TBeginPayload>;
}

/**
 * Интерфейс свойств объекта RSAA с передаваемыми данными в body request
 */
export interface IRSAAWithData<TResponse, TData = unknown, TBeginPayload = unknown> {
    [CALL_REDUX_API_MIDDLEWARE]: IRSAAPropsWithData<TResponse, TData, TBeginPayload>;
}

/**
 * Интерфейс свойств объекта RSAA с передаваемыми данными в body request
 */
export interface IRSAAMayHaveData<TResponse, TData = unknown, TBeginPayload = unknown> {
    [CALL_REDUX_API_MIDDLEWARE]: IRSAAPropsWithData<TResponse, TData, TBeginPayload>;
}

/**
 * Интерфейс передаваемых в адаптер middleware свойств RSAA
 */
export type TCallApiAdapterProps =
    | IRSAAProps<unknown, unknown>
    | IRSAAPropsWithData<unknown, unknown, unknown>;

/**
 * Интерфейс Action в redux middleware согласно Redux Standart API-calling Actions
 */
export type TRSAAction = UnknownAction | IRSAA<unknown> | IRSAAWithData<unknown> | IRSAAMayHaveData<unknown>;
