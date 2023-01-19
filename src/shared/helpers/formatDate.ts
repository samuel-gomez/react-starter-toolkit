export type TisValidDate = string | Date;

export const isValidDate = (date: TisValidDate) =>
  (date !== null && date !== undefined && Number.isNaN(Number(date))) || (typeof date === 'string' && date !== '');

export const formatDate = (date: TisValidDate = '01/01/1970', locale = 'fr-FR', options?: Intl.DateTimeFormatOptions) =>
  date === '' ? '' : new Intl.DateTimeFormat(locale, options).format(new Date(date));

export type TsetDate = {
  date: TisValidDate;
  formatDateFn?: typeof formatDate;
  isValidDateFn?: typeof isValidDate;
};

export const setDate = ({ date, formatDateFn = formatDate, isValidDateFn = isValidDate }: TsetDate) =>
  isValidDateFn(date) ? formatDateFn(date) : '';
