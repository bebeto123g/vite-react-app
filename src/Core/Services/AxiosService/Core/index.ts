import { IErrorsResult } from 'Core/Models';
import { IRequestProperty, IRequestPropertyWithData } from 'Core/Services/AxiosService';
import { axiosRequestFabric, transformRequestPropertyForRestActive } from './axiosRequestFabric';

const { POST, GET, DELETE, PUT, PATCH } = axiosRequestFabric<IErrorsResult>();

export const AxiosService = {
    POST:
        <TResponse, TData = unknown>(
            requestProperty: IRequestPropertyWithData<TResponse, TData, IErrorsResult>
        ) =>
        () =>
            POST(transformRequestPropertyForRestActive<TResponse, TData>(requestProperty)),

    GET:
        <TResponse>(requestProperty: IRequestProperty<TResponse, IErrorsResult>) =>
        () =>
            GET(
                transformRequestPropertyForRestActive<
                    TResponse,
                    never,
                    IRequestProperty<TResponse, IErrorsResult>
                >(requestProperty)
            ),

    DELETE:
        <TResponse, TData = unknown>(
            requestProperty:
                | IRequestProperty<TResponse, IErrorsResult>
                | IRequestPropertyWithData<TResponse, TData, IErrorsResult>
        ) =>
        () =>
            DELETE(
                transformRequestPropertyForRestActive<
                    TResponse,
                    TData,
                    | IRequestPropertyWithData<TResponse, TData, IErrorsResult>
                    | IRequestProperty<TResponse, IErrorsResult>
                >(requestProperty)
            ),

    PATCH:
        <TResponse, TData = unknown>(
            requestProperty: IRequestPropertyWithData<TResponse, TData, IErrorsResult>
        ) =>
        () =>
            PATCH(transformRequestPropertyForRestActive<TResponse, TData>(requestProperty)),

    PUT:
        <TResponse, TData = unknown>(
            requestProperty: IRequestPropertyWithData<TResponse, TData, IErrorsResult>
        ) =>
        () =>
            PUT(transformRequestPropertyForRestActive<TResponse, TData>(requestProperty)),
};
