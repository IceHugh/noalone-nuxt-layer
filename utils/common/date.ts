import { format } from 'date-fns';

export const formatDate = (date: Date, formatStr: string) => {
  return format(date, formatStr);
};

export const formatDateTime = (date: Date) => {
  return format(date, 'yyyy-MM-dd HH:mm');
};
