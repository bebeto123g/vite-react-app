// import { EProcessStatus } from 'Core/Enums';
// import { IAsyncData, IErrorsResult, TAsyncAction } from 'Core/Models';
// import { EProcessActionTypeSuffixes } from '../enums';
// import { IReducerGroupPrepare, IStandardAsyncReducer } from './interfaces';

// /**
//  * Хелпер для получения генерации нового состояния
//  *
//  * @param prevState Предыдущее состояние
//  * @param action Экшен, передаваемый в редюсер
//  */
// const createAsyncDataHelper =
//     <TStateData, TServiceData = TStateData, TPayload = unknown>(
//         prevState: IAsyncData<TStateData>,
//         action: TAsyncAction<TServiceData, TPayload>
//     ) =>
//     /**
//      * Функция для создания нового состояния
//      *
//      * @param status Статус загрузки
//      * @param [prepareCallback] Предобработчик данных
//      * @param [errors] Ошибки при выполнении запроса
//      */
//     (
//         status: EProcessStatus,
//         prepareCallback?: IStandardAsyncReducer<TStateData, TServiceData, TPayload>,
//         errors?: IErrorsResult
//     ): IAsyncData<TStateData> => ({
//         status,
//         data: prepareCallback ? prepareCallback(prevState, action) : prevState.data,
//         errors,
//     });
// /**
//  * Хелпер для вызова кастомных редюсеров в createAsyncReducer и createMultiAsyncReducer
//  *
//  * @param prevState Предыдущее состояние
//  * @param action Экшен, передаваемый в редюсер
//  * @param [prepare] Предобработчик данных для этапов жизненного цикла запроса
//  */
// const customPrepareReducerHelper = <TStateData, TServiceData = TStateData, TPayload = unknown>(
//     prevState: IAsyncData<TStateData>,
//     action: TAsyncAction<TServiceData, TPayload>,
//     prepare: IReducerGroupPrepare<TStateData, TServiceData, TPayload> = {}
// ): IAsyncData<TStateData> | void => {
//     const { custom } = prepare;

//     if (custom && action.type in custom && typeof custom[action.type] === 'function') {
//         return custom[action.type](prevState, action);
//     }

//     return undefined;
// };

// /**
//  * Хелпер ищет и отрезает асинхронные преффиксы у типа экшена
//  */
// const cutAsyncPreffix = (actionType: string): string => {
//     const suffixes = Object.values(EProcessActionTypeSuffixes);

//     for (let i = 0; i < suffixes.length; i++) {
//         const suffix = suffixes[i];

//         if (actionType.includes(suffix)) {
//             return actionType.replace(suffix, '');
//         }
//     }

//     return actionType;
// };

// /**
//  * Хелпер для вызова кастомных редюсеров в createAsyncReducer и createMultiAsyncReducer
//  *
//  * @param actionType Тип экшена
//  * @param prevState Предыдущее состояние
//  * @param action Экшен, передаваемый в редюсер
//  * @param [prepare] Предобработчик данных для этапов жизненного цикла запроса
//  */
// const chainPrepareReducerHelper = <TStateData, TServiceData = TStateData, TPayload = unknown>(
//     actionType: string,
//     prevState: IAsyncData<TStateData>,
//     action: TAsyncAction<TServiceData, TPayload>,
//     prepare: IReducerGroupPrepare<TStateData, TServiceData, TPayload> = {}
// ): IAsyncData<TStateData> | void => {
//     const { begin, success, failure } = prepare;

//     switch (action.type) {
//         case actionType + EProcessActionTypeSuffixes.BEGIN:
//             return createAsyncDataHelper<TStateData, never, TPayload>(
//                 prevState,
//                 action as TAsyncAction<never, TPayload>
//             )(EProcessStatus.RUNNING, begin);

//         case actionType + EProcessActionTypeSuffixes.SUCCESS:
//             return createAsyncDataHelper<TStateData, TServiceData, TPayload>(
//                 prevState,
//                 action as TAsyncAction<TServiceData, TPayload>
//             )(EProcessStatus.RUNNING, success);

//         case actionType + EProcessActionTypeSuffixes.FAILURE:
//             return createAsyncDataHelper<TStateData, IErrorsResult, TPayload>(
//                 prevState,
//                 action as TAsyncAction<IErrorsResult, TPayload>
//             )(EProcessStatus.RUNNING, failure, action.payload.response as IErrorsResult);
//     }

//     return undefined;
// };
