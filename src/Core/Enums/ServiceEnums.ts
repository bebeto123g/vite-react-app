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
