import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';

// Подключаем плагины
dayjs.extend(dayOfYear);
dayjs.extend(relativeTime);
dayjs.extend(calendar);

export const dateFormatter = (date: string) => {
  const messageDay = dayjs(date).dayOfYear();
  const currentDay = dayjs().dayOfYear();
  const messageYear = dayjs(date).year();
  const currentYear = dayjs().year();

  if (messageDay === currentDay && messageYear === currentYear) {
    return 'today, ' + dayjs(date).format("HH:mm"); // HH для 24-часового формата
  } 
  else if (currentDay - messageDay === 1 && messageYear === currentYear) {
    return 'yesterday, ' + dayjs(date).format("HH:mm");
  }
  else {
    return dayjs(date).format("DD.MM.YY") + ' / ' + dayjs(date).format("HH:mm");
  }
};

export const LastMessageDateFormatter = (date: string) => {
  const messageDay = dayjs(date).dayOfYear();
  const currentDay = dayjs().dayOfYear();
  const messageYear = dayjs(date).year();
  const currentYear = dayjs().year();

  if (messageDay === currentDay && messageYear === currentYear) {
    return dayjs(date).format("HH:mm");
  }
  else {
    return dayjs(date).format("DD.MM.YY");
  }
};