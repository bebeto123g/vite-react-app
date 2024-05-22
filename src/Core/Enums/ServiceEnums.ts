/**
 * Статусная модель процесса запроса асинхронных данных
 *
 * @prop IDLE - Бездействие
 * @prop RUNNING - Загрузка
 * @prop SUCCESS - Успех
 * @prop FAIL - Ошибка
 */
export enum EProcessStatus {
    IDLE = 0,
    RUNNING = 1,
    SUCCESS = 2,
    FAIL = 3,
}

/**
 * Описание экземпляра ошибки
 *
 * @prop REQUIRED - Не указано обязательное поле
 * @prop UNIQUE - Нарушение уникальности ключей
 * @prop NOT_IN_RANGE - Значение не соответствует допустимому диапазону
 * @prop UNKNOWN - Общий код
 */
export enum EErrorType {
    REQUIRED = 'REQUIRED',
    UNIQUE = 'UNIQUE',
    NOT_IN_RANGE = 'NOT_IN_RANGE',
    UNKNOWN = 'UNKNOWN',
}
