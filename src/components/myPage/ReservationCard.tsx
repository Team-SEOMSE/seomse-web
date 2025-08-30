import { ReactComponent as Clock } from "../../assets/svg/clock.svg";
import styles from "./ReservationCard.module.css";

type Props = {
  dateTime: string;
  title: string;
  subtitle: string;
  status: string;
  dday: string;
  onClick?: () => void;
};

const ReservationCard = ({
  dateTime,
  title,
  subtitle,
  status,
  dday,
  onClick,
}: Props) => {
  return (
    <div
      className={styles.card}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <div className={styles.top}>
        <Clock className={styles.clock} aria-hidden />
        <span className={styles.dateTime}>{dateTime}</span>
      </div>

      <div className={styles.divider} />

      <div className={styles.row1}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.badge}>{status}</span>
      </div>

      <div className={styles.row2}>
        <p className={styles.subtitle}>{subtitle}</p>
        <span className={styles.dday}>{dday}</span>
      </div>
    </div>
  );
};

export default ReservationCard;
