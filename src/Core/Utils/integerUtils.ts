/** Фцнкция возвращает случайное число от min до max */
export const randomInteger = (min = 0, max = 100) => Math.round(Math.random() * (max - min) + min);
