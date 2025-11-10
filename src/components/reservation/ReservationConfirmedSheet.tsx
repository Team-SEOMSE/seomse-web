import { ReactComponent as Complete } from "../../assets/svg/complete.svg";
import styles from "./ReservationConfirmedSheet.module.css";

interface ReservationConfirmedSheetProps {
  shopName: string;
  serviceName?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  onClose: () => void;
}

// "2025-09-18" -> "9월 18일"
const formatDate = (dateStr: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

// "12:00:00" -> "12:00"
const formatTime = (timeStr: string): string => {
  if (!timeStr) return "";
  const [hour, minute] = timeStr.split(":");
  return `${hour}:${minute}`;
};

const ReservationConfirmedSheet = ({
  shopName,
  serviceName,
  appointmentDate,
  appointmentTime,
  onClose,
}: ReservationConfirmedSheetProps) => {
  const formattedDateTime =
    appointmentDate && appointmentTime
      ? `${formatDate(appointmentDate)} ${formatTime(appointmentTime)}`
      : "";
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close_button} onClick={onClose}>
          &times;
        </button>

        <div className={styles.confirmed_header}>
          <div className={styles.icon_wrap}>
            <Complete />
          </div>
          <h2 className={styles.title}>예약이 확정되었습니다.</h2>
          <p className={styles.subtitle}>
            방문이 마음에 드셨다면{" "}
            <span className={styles.highlight}>리뷰 한 줄</span> 남겨주세요!
          </p>
        </div>

        <div className={styles.confirmed_body}>
          <div className={styles.shop_card}>
            {formattedDateTime && (
              <p className={styles.datetime}>{formattedDateTime}</p>
            )}
            <strong>{shopName}</strong>
            {serviceName && <p className={styles.service}>{serviceName}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmedSheet;
