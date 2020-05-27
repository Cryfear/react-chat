import formatDistanceToNow from "date-fns/formatDistanceToNow";
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import ruLocale from "date-fns/locale/ru";

interface dateFormatterProps {
  date: number | Date;
  withConverting?: boolean;
}

export const dateFormatter = ({ date, withConverting }: dateFormatterProps) => {
  // withConverting это значит нужно ли упрощать дату
  // (сейчас, 1ч назад, 1д назад) и т.д
  if (withConverting) {
    // функция пока еще не реализована
    return formatDistanceStrict(date, new Date(2020, 4, 28),{
      addSuffix: true,
      locale: ruLocale,
    })
  } else {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ruLocale,
    });
  }
};
