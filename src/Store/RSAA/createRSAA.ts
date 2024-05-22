import { CALL_REDUX_API_MIDDLEWARE } from './constants';
import { IRSAA, IRSAAFabricProps, IRSAAMayHaveData, IRSAAWithData, TRSAAction } from './interfaces';

/**
 * Создание Redux Standart API-calling Actions
 *
 * @param request Данные запроса в соответствие интерфейсу IRSAAProps
 * @param payload ДАнные, которые могут быть прокинуты при старте запроса
 */
function createRSAA<TResponse, TBeginPayload = unknown>(
    request: IRSAAFabricProps<TResponse>,
    payload?: TBeginPayload
): IRSAA<TResponse, TBeginPayload>;
function createRSAA<TResponse, TData = unknown, TBeginPayload = unknown>(
    request: IRSAAFabricProps<TResponse, TData>,
    payload: TBeginPayload
): IRSAAWithData<TResponse, TData, TBeginPayload>;
function createRSAA<TResponse, TData = unknown, TBeginPayload = unknown>(
    request: IRSAAFabricProps<TResponse, TData>,
    payload: TBeginPayload
): IRSAAMayHaveData<TResponse, TData, TBeginPayload>;

function createRSAA(request: any, payload: unknown): TRSAAction {
    return { [CALL_REDUX_API_MIDDLEWARE]: { ...request, payload } };
}

export { createRSAA };
