export const formatDate = (date: string, locale = 'fr-FR') => new Intl.DateTimeFormat(locale).format(new Date(date));

export const isValidDate = (date: string) => date !== null && date !== undefined && date !== '' && isNaN(Number(date));

export type TsetDate = {
  date: string;
  formatDateFn?: typeof formatDate;
  isValidDateFn?: typeof isValidDate;
};
export const setDate = ({ date, formatDateFn = formatDate, isValidDateFn = isValidDate }: TsetDate) =>
  isValidDateFn(date) ? formatDateFn(date) : '';
