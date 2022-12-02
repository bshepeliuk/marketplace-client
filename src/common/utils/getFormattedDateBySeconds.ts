import { format } from 'date-fns';
import convertSecondsToMs from './convertSecondsToMs';

const getFormattedDateBySeconds = (seconds: number) => {
  const date = new Date(convertSecondsToMs(seconds));
  return format(date, 'dd MMM yyyy hh:mm a');
};

export default getFormattedDateBySeconds;
