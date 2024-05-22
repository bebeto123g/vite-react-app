import { Action } from '@reduxjs/toolkit';
import { EErrorType, EProcessStatus } from 'Core/Enums';

/**
 * Экземпляр ошибки
 *
 * @prop type Категория ошибки
 * @prop attributes Список аттрибутов, к которым относится ошибка
 */
export interface IError {
    type: EErrorType;
    attributes: string[];
}

/**
 * Общий интерфейс любых ошибок, возникших в результате обращения к серверу
 *
 * @prop timestamp Таймстамп ошибки
 * @prop [errors] Описание произошедших ошибок
 * @prop detailMessage Системное описание ошибки (для разработчиков)
 * @prop isAbortError Является ли ошибка следствием вызова AbortController
 */
export interface IServerErrorsResult {
    timestamp: string;
    errors?: IError[];
    detailMessage?: string;
    isAbortError: boolean;
}

/**
 * Общий интерфейс любых ошибок, возникших в результате обращения к серверу
 *
 * @prop httpCode Код ответа на HTTP-запрос
 * @prop timestamp Таймстамп ошибки
 * @prop [errors] Описание произошедших ошибок
 * @prop detailMessage Системное описание ошибки (для разработчиков)
 * @prop isAbortError Является ли ошибка следствием вызова AbortController
 */
export interface IErrorsResult extends IServerErrorsResult {
    httpCode: number;
}

/**
 * Интерфейс асинхронных данных между клиентом и сервером
 *
 * @prop status Статус процесса загрузки данных
 * @prop data Данные
 * @prop [errors] Описание произошедших ошибок
 */
export interface IAsyncData<TData = unknown, TErrors = IErrorsResult> {
    status: EProcessStatus;
    data: TData | null;
    errors?: TErrors;
}

/**
 * Расширенный строгий интерфейс Action для Redux
 */
export interface IReduxAction<TPayload> extends Action {
    payload: TPayload;
    error?: boolean;
}

/**
 * Интерфейс асихронного экшена
 */
export type TAsyncAction<TData = unknown, TPayload = unknown> = IReduxAction<IAsyncPayload<TData, TPayload>>;

/**
 * Интерфейс объекта payload, приходящего для асинхронных экшенов
 *
 * @prop response Ответ от сервиса
 * @prop actionPayload Пользовательские данные из функции вызова экшена
 */
export interface IAsyncPayload<TData, TPayload> {
    response: TData;
    actionPayload: TPayload;
}
