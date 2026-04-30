import styles from "@/components/messageList/data/date.module.scss"
import clsx from 'clsx';

interface IStartChatTime {
  time: string;
}

export default function MessageDate({time}:IStartChatTime) {

  return (
    <div className={clsx(styles.dateSeparator, 'd-1')}>
      <span>{time}</span>
    </div>
  )
}
