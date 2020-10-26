export default (date, locale = 'fr-FR') => new Intl.DateTimeFormat(locale).format(new Date(date));
