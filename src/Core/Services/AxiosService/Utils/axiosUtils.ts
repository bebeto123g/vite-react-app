import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ERestMethod, IRequestProperty, IRequestPropertyWithData } from 'Core/Services/AxiosService';
import { getMockData } from './getMockData';

const axiosRequestMethodSplit = <TResponse, TData = unknown>(
    method: ERestMethod,
    url: string,
    data: TData,
    responseConfiguration: AxiosRequestConfig
): Promise<AxiosResponse<TResponse>> | null => {
    switch (method) {
        case ERestMethod.POST:
            return axios.post(url, data, responseConfiguration);

        case ERestMethod.GET:
            return axios.get(url, responseConfiguration);

        case ERestMethod.DELETE:
            return axios.delete(url, {
                data,
                ...responseConfiguration,
            });

        case ERestMethod.PATCH:
            return axios.patch(url, data, responseConfiguration);

        case ERestMethod.PUT:
            return axios.put(url, data, responseConfiguration);

        default:
            return null;
    }
};

export const axiosRequestFabric = <TResponse, TData = unknown, TErrorResult = unknown>(
    method: ERestMethod,
    requestProperty:
        | IRequestProperty<TResponse, TErrorResult>
        | IRequestPropertyWithData<TResponse, TData, TErrorResult>
): Promise<AxiosResponse<TResponse>> => {
    let responsePromise: Promise<AxiosResponse<TResponse>> | null;

    const {
        source,
        data = {},
        params,
        config,
        serviceMockDelay,
        mockCallbackServiceSimulator,
    } = requestProperty;

    const responseConfiguration: AxiosRequestConfig = { ...config, params };

    if (source.forceMock && source.mock) {
        responsePromise = getMockData(
            source.mock,
            responseConfiguration,
            serviceMockDelay,
            mockCallbackServiceSimulator
        );
    } else {
        responsePromise = axiosRequestMethodSplit<TResponse>(method, source.url, data, responseConfiguration);
    }

    if (!responsePromise) {
        throw new Error('Не удалось выполнить запрос на сервер, не указаны необходимые параметры');
    }

    return responsePromise;
};
