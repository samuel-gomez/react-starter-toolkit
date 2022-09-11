export const formatDate = (date: string | Date, locale = 'fr-FR') => new Intl.DateTimeFormat(locale).format(new Date(date));

export const isValidDate = (date: string | Date) =>
  (date !== null && date !== undefined && isNaN(Number(date))) || (typeof date === 'string' && date !== '');

export type TsetDate = {
  date: string;
  formatDateFn?: typeof formatDate;
  isValidDateFn?: typeof isValidDate;
};

export const setDate = ({ date, formatDateFn = formatDate, isValidDateFn = isValidDate }: TsetDate) =>
  isValidDateFn(date) ? formatDateFn(date) : '';
