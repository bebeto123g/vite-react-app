import { Dispatch } from '@reduxjs/toolkit';
import { IErrorsResult } from 'Core/Models';
import { EProcessActionTypeSuffixes } from '../enums';

/**
 * Диспатч экшена с суффиксом BEGIN для передачи в состояние
 *
 * @param dispatch Redux-dispatch
 * @param actionType Тип экшена без суффикса
 */
const dispatchBegin =
    <TPayload>(dispatch: Dispatch, actionType: string) =>
    /**
     * Возвращаем функция для диспатча actionType + EProcessActionTypeSuffixes.BEGIN
     *
     * @param [actionPayload] Опциональные даные, которые требуется прокинуть при старте запроса
     */
    (actionPayload?: TPayload): TPayload | void => {
        dispatch({
            type: actionType + EProcessActionTypeSuffixes.BEGIN,
            payload: { response: null, actionPayload },
        });

        return actionPayload;
    };

/**
 * Диспатч экшена с суффиксом SUCCESS для передачи полученных данных в стор
 *
 * @param dispatch Redux-dispatch
 * @param actionType Тип экшена без суффикса
 */
const dispatchSuccess =
    <TResponsePayload, TPayload>(dispatch: Dispatch, actionType: string) =>
    /**
     * Возвращаем функция для диспатча actionType + EProcessActionTypeSuffixes.SUCCESS
     *
     * @param data Данные с сервера
     * @param [actionPayload] Опциональные даные, которые требуется прокинуть при старте запроса
     */
    (data: TResponsePayload, actionPayload?: TPayload): TResponsePayload => {
        dispatch({
            type: actionType + EProcessActionTypeSuffixes.SUCCESS,
            payload: { response: data, actionPayload },
        });

        return data;
    };

/**
 * Диспатч экшена с суффиксом FAILURE для передачи информации об ошибке
 *
 * @param dispatch Redux-dispatch
 * @param actionType Тип экшена без суффикса
 */
const dispatchError =
    <TPayload>(dispatch: Dispatch, actionType: string) =>
    /**
     * Возвращаем функция для диспатча actionType + EProcessActionTypeSuffixes.FAILURE
     *
     * @param error Объект ошибки при запросе
     * @param [actionPayload] Опциональные даные, которые требуется прокинуть при старте запроса
     */
    (error: IErrorsResult, actionPayload?: TPayload): Promise<IErrorsResult> => {
        dispatch({
            type: actionType + EProcessActionTypeSuffixes.FAILURE,
            payload: { response: error, actionPayload },
            error: true,
        });

        return Promise.reject(error);
    };

/**
 * Реализация типовой схемы получения асинхронных данных
 *
 * @param actionType Тип экшена без суффикса
 * @param asyncCall Вызов API. Возвращает Promise для дальнейшей работы с ним
 * @param [payload] Опциональные данные, которые требуется прокинуть при старте запроса
 */
const dispatchAsync =
    <TResponsePayload, TPayload>(
        actionType: string,
        asyncCall: () => Promise<TResponsePayload>,
        payload?: TPayload
    ) =>
    /**
     * Возвращаем функция типовой схемы получения асинхронных данных
     *
     * @param dispatch Redux-dispatch
     */
    (dispatch: Dispatch): Promise<TResponsePayload> => {
        dispatchBegin<TPayload>(dispatch, actionType)(payload);

        const responseData: Promise<TResponsePayload> = asyncCall();

        if (responseData) {
            responseData.then(
                (data: TResponsePayload) =>
                    dispatchSuccess<TResponsePayload, TPayload>(dispatch, actionType)(data, payload),
                (error: IErrorsResult) => dispatchError<TPayload>(dispatch, actionType)(error, payload)
            );
        }

        return responseData;
    };

/**
 * Реализация типовой схемы получения асинхронных данных при обработке схемы
 * асинхронного вызова API через обертку с промисами
 *
 * @param dispatch Redux-dispatch
 * @param actionType Тип экшена без суффикса
 * @param asyncCall Вызов API. Возвращает Promise для дальнейшей работы с ним
 * @param [payload] Опциональные данные, которые требуется прокинуть при старте запроса
 */
export const dispatchAsyncResponseBound = <TResponsePayload, TPayload = unknown>(
    dispatch: Dispatch,
    actionType: string,
    asyncCall: () => Promise<TResponsePayload>,
    payload?: TPayload
): Promise<TResponsePayload> =>
    dispatchAsync<TResponsePayload, TPayload>(actionType, asyncCall, payload)(dispatch);
