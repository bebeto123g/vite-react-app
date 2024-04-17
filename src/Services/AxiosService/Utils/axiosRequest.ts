import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { randomInteger } from 'Core/Utils';
import {
    DEFAULT_SERVICE_MOCK_DELAY,
    ERestMethod,
    IRequestProperty,
    IRequestPropertyWithData,
    IServiceMockDelay,
    TMockCallbackServiceSimulator,
} from 'Services/AxiosService';

/**
 * Функция для получения данных из моков с возможностью подмены данных
 *
 * @param source путь до JSON
 * @param requestConfig Конфигурация запроса
 * @param serviceMockDelay Требуется ли задержка для возврата данных мока
 * @param mockCallbackServiceSimulator Колбэк симулятор поведения сервиса для подмены данных JSON
 */
const getMockData = <TResponse>(
    source: string,
    requestConfig: AxiosRequestConfig,
    serviceMockDelay: boolean | IServiceMockDelay = false,
    mockCallbackServiceSimulator?: TMockCallbackServiceSimulator<TResponse>
) => {
    const mockDelay =
        typeof serviceMockDelay === 'boolean' && serviceMockDelay
            ? DEFAULT_SERVICE_MOCK_DELAY
            : serviceMockDelay;

    const axiosPromise = mockDelay
        ? axios.get(source, requestConfig).then(
              (axiosResponse: AxiosResponse<TResponse>): Promise<AxiosResponse<TResponse>> =>
                  new Promise((resolve) => {
                      setTimeout(
                          () => {
                              resolve(axiosResponse);
                          },
                          randomInteger(mockDelay.minDelay, mockDelay.maxDelay)
                      );
                  })
          )
        : axios.get(source);

    if (!mockCallbackServiceSimulator) {
        return axiosPromise;
    }

    return axiosPromise.then(
        (axiosResponse: AxiosResponse<TResponse>): AxiosResponse<TResponse> => ({
            ...axiosResponse,
            data: mockCallbackServiceSimulator(axiosResponse.data),
        })
    );
};

/**
 * Функция распределяет параметры запросы в зависимости от метода
 *
 * @param method Метод запроса
 * @param url URL запроса
 * @param data Тело запроса
 * @param configuration Конфигурации запроса
 */
const axiosRequestMethodSplit = <TResponse, TData = unknown>(
    method: ERestMethod,
    url: string,
    data: TData,
    configuration: AxiosRequestConfig
): Promise<AxiosResponse<TResponse>> | null => {
    switch (method) {
        case ERestMethod.POST:
            return axios.post(url, data, configuration);

        case ERestMethod.GET:
            return axios.get(url, configuration);

        case ERestMethod.DELETE:
            return axios.delete(url, {
                data,
                ...configuration,
            });

        case ERestMethod.PATCH:
            return axios.patch(url, data, configuration);

        case ERestMethod.PUT:
            return axios.put(url, data, configuration);

        default:
            return null;
    }
};

export const axiosRequest = <TResponse, TData = unknown, TErrorResult = unknown>(
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
