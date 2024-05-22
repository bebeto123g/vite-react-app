import { Dispatch, Middleware, UnknownAction, isPlainObject } from '@reduxjs/toolkit';
import { AxiosService, ERestMethod } from 'Services/AxiosService';
import { dispatchAsyncResponseBound } from 'Store/Utils';
import { CALL_REDUX_API_MIDDLEWARE } from './constants';
import { IRSAA, IRSAAWithData, TCallApiAdapterProps, TRSAAction } from './interfaces';

/**
 * Адаптер к обертке AxiosService для CallApiAdapter
 */
const callApiAdapter = ({ options, ...props }: TCallApiAdapterProps) =>
    options.method === ERestMethod.GET
        ? AxiosService[ERestMethod.GET](props)
        : AxiosService[options.method]({ ...props, data: options.body });

/**
 * Проверка экшена на соответствие Redux Standart API-calling Actions
 */
const isRSAA = (action: TRSAAction): action is IRSAA<unknown> | IRSAAWithData<unknown> =>
    isPlainObject(action) && Object.hasOwn(action, CALL_REDUX_API_MIDDLEWARE);

/**
 * Создание сервисного слоя в redux middleware согласно Redux Standart API-calling Actions
 *
 * @description Включает в себя реализацию типовой схемы получения
 * асинхронных данных при обработке схемы асинхронного API через обертку с промисами
 */
export const apiMiddleware: Middleware = () => (next) => (_action) => {
    const action = _action as TRSAAction;
    if (!isRSAA(action)) {
        return next(action);
    }

    const RSAA: TCallApiAdapterProps = {
        ...action[CALL_REDUX_API_MIDDLEWARE],
    };

    return dispatchAsyncResponseBound(
        next as Dispatch<UnknownAction>,
        RSAA.type,
        callApiAdapter(RSAA),
        RSAA.payload
    );
};
