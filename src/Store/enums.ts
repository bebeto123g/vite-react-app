/**
 * Суффиксы для асинхронных экшенов
 *
 * @prop BEGIN - Суффикс запущеного процесса
 * @prop SUCCESS - Суффикс успешного процесса
 * @prop FAILURE - Суффикс завершенного с ошибкой процесса
 */
export enum EProcessActionTypeSuffixes {
    BEGIN = '_BEGIN',
    SUCCESS = '_SUCCESS',
    FAILURE = '_FAILURE',
}
