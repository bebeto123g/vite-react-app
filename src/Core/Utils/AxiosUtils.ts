// import { AxiosRequestConfig, AxiosResponse } from 'axios';
// import { ERestMethod } from 'Core/Enums';
// import { IRequestProperty, IRequestPropertyWithData } from 'Core/Models';

// export const axiosRequestFabric = <TResponse, TData = unknown, TErrorResult = unknown>(
//     method: ERestMethod,
//     requestProperty:
//         | IRequestProperty<TResponse, TErrorResult>
//         | IRequestPropertyWithData<TResponse, TData, TErrorResult>
// ): Promise<AxiosResponse<TResponse>> => {
//     let responsePromise: Promise<AxiosResponse<TResponse>>;
//     const { source, params, config, serviceMockDelay, mockCallbackServiceSimulator } = requestProperty;

//     const responseConfiguration: AxiosRequestConfig = { ...config, params };

//     if (source.forceMock) {
//         responsePromise = getMockData(
//             source.mock,
//             responseConfiguration,
//             serviceMockDelay,
//             mockCallbackServiceSimulator
//         );
//     } else {
//     }
// };
