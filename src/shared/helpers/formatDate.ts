export const formatDate = (date: string | Date, locale = 'fr-FR', options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(locale, options).format(new Date(date));

export const isValidDate = (date: string | Date) =>
  (date !== null && date !== undefined && isNaN(Number(date))) || (typeof date === 'string' && date !== '');

export type TsetDate = {
  date: string;
  formatDateFn?: typeof formatDate;
  isValidDateFn?: typeof isValidDate;
};

export const setDate = ({ date, formatDateFn = formatDate, isValidDateFn = isValidDate }: TsetDate) =>
  isValidDateFn(date) ? formatDateFn(date) : '';
