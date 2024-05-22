import { IAsyncData, IErrorsResult, IReduxAction, TAsyncAction } from 'Core/Models';

/**
 * Интерфейс стандартной функции предобработки асинхронных данных
 */
export interface IStandardAsyncReducer<TStateData, TServiceData = TStateData, TPayload = undefined> {
    (state: IAsyncData<TStateData>, action: TAsyncAction<TServiceData, TPayload>): TStateData;
}

/**
 * Интерфейс кастомной функции предобработки асинхронных данных
 */
export interface ICustomAsyncReducer<TStateData, TServiceData = TStateData, TPayload = undefined> {
    (
        state: IAsyncData<TStateData>,
        action: IReduxAction<TPayload> | TAsyncAction<TServiceData | IErrorsResult, TPayload>
    ): IAsyncData<TStateData>;
}

/**
 * Интерфейс кастомных предобработчиков данных, если потребуется логика обработки данных на стороне клиента
 */
export interface ICustomAsyncReducersMap<TStateData, TServiceData = TStateData, TPayload = undefined> {
    [type: string]: ICustomAsyncReducer<TStateData, TServiceData, TPayload>;
}

/**
 * Интерфейс предобработчика данных для асинхронных запросов в цепочке BIGIN => SUCCESS | FAILURE
 *
 * @prop begin Предобработчик при BIGIN
 * @prop success Предобработчик при SUCCESS
 * @prop failure Предобработчик при FAILURE
 * @prop custom Кастомный предобработчик, для кейсов обработки данных вне базового цикла
 */
export interface IReducerGroupPrepare<TStateData, TServiceData = TStateData, TPayload = undefined> {
    begin?: IStandardAsyncReducer<TStateData, never, TPayload>;
    success?: IStandardAsyncReducer<TStateData, TServiceData, TPayload>;
    failure?: IStandardAsyncReducer<TStateData, IErrorsResult, TPayload>;
    custom?: ICustomAsyncReducersMap<TStateData, TServiceData, TPayload>;
}
