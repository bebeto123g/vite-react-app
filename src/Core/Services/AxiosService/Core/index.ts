import { IErrorsResult } from 'Core/Models';
import { IRequestProperty, IRequestPropertyWithData } from 'Core/Services/AxiosService';
import { axiosRequestFabric, transformRequestPropertyForRestActive } from './axiosRequestFabric';

const { POST, GET, DELETE, PUT, PATCH } = axiosRequestFabric<IErrorsResult>();

export class AxiosService {
    static POST<TResponse, TData = unknown>(
        requestProperty: IRequestPropertyWithData<TResponse, TData, IErrorsResult>
    ) {
        return () => POST(transformRequestPropertyForRestActive<TResponse, TData>(requestProperty));
    }

    static GET<TResponse>(requestProperty: IRequestProperty<TResponse, IErrorsResult>) {
        return () =>
            GET(
                transformRequestPropertyForRestActive<
                    TResponse,
                    never,
                    IRequestProperty<TResponse, IErrorsResult>
                >(requestProperty)
            );
    }

    static DELETE<TResponse, TData = unknown>(
        requestProperty:
            | IRequestProperty<TResponse, IErrorsResult>
            | IRequestPropertyWithData<TResponse, TData, IErrorsResult>
    ) {
        return () =>
            DELETE(
                transformRequestPropertyForRestActive<
                    TResponse,
                    TData,
                    | IRequestPropertyWithData<TResponse, TData, IErrorsResult>
                    | IRequestProperty<TResponse, IErrorsResult>
                >(requestProperty)
            );
    }

    static PATCH<TResponse, TData = unknown>(
        requestProperty: IRequestPropertyWithData<TResponse, TData, IErrorsResult>
    ) {
        return () => PATCH(transformRequestPropertyForRestActive<TResponse, TData>(requestProperty));
    }

    static PUT<TResponse, TData = unknown>(
        requestProperty: IRequestPropertyWithData<TResponse, TData, IErrorsResult>
    ) {
        return () => PUT(transformRequestPropertyForRestActive<TResponse, TData>(requestProperty));
    }
}
