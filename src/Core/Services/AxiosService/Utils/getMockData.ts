import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
    DEFAULT_SERVICE_MOCK_DELAY,
    IServiceMockDelay,
    TMockCallbackServiceSimulator,
} from 'Core/Services/AxiosService';
import { randomInteger } from 'Core/Utils';

/**
 * Функция для получения данных из моков с возможностью подмены данных
 *
 * @param source путь до JSON
 * @param requestConfig Конфигурация запроса
 * @param serviceMockDelay Требуется ли задержка для возврата данных мока
 * @param mockCallbackServiceSimulator Колбэк симулятор поведения сервиса для подмены данных JSON
 */
export const getMockData = <TResponse>(
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
