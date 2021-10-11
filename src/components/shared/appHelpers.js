import format from 'date-fns/format';

export const getFormattedDate = date => format(new Date(date), 'MMMM dd, yyyy');
