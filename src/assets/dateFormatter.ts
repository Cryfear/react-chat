import moment from "moment";

moment.locale("ru");

interface dateFormatterProps {
  date: number | Date;
}

export const dateFormatter = ({ date }: dateFormatterProps) => {
  return moment(date).format("hh:mm");
};
