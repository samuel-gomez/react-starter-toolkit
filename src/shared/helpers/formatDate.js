export const formatDate = (date, locale = 'fr-FR') => new Intl.DateTimeFormat(locale).format(new Date(date));

export const isValidDate = date => date !== null && date !== undefined && date !== '' && isNaN(Number(date));

export const setDate = ({ date, formatDateFn = formatDate, isValidDateFn = isValidDate }) => (isValidDateFn(date) ? formatDateFn(date) : '');
