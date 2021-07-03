import moment from "moment";
import * as dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear';

dayjs().format();
dayjs.extend(dayOfYear);

export const dateFormatter = (date: Date) => {
  const messageDay = dayjs(date).dayOfYear()
  const currentDay = dayjs().dayOfYear()
  const messageYear = dayjs(date).year()
  const currentYear = dayjs().year()

  if (messageDay === currentDay && messageYear === currentYear) {
    return 'today, ' + moment(date).format("hh:mm");
  } 
  else if(currentDay - messageDay  === 1 && messageYear === currentYear){
    return 'yesterday, ' + moment(date).format("hh:mm");
  }
  else {
      return moment(date).format("DD.MM.YY") + ' / ' + moment(date).format("hh:mm");
  }
};
