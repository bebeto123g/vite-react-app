import { EErrorType } from 'Core/Enums';

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
 * @prop errors Описание произошедших ошибок
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
 * @prop errors Описание произошедших ошибок
 * @prop detailMessage Системное описание ошибки (для разработчиков)
 * @prop isAbortError Является ли ошибка следствием вызова AbortController
 */
export interface IErrorsResult extends IServerErrorsResult {
    httpCode: number;
}
