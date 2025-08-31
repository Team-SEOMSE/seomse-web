import { ReactComponent as Complete } from "../../assets/svg/complete.svg";
import styles from "./ReservationConfirmedSheet.module.css";

interface ReservationConfirmedSheetProps {
  shopName: string;
  serviceName?: string;
  onClose: () => void;
}

const ReservationConfirmedSheet = ({
  shopName,
  serviceName,
  onClose,
}: ReservationConfirmedSheetProps) => {
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
            <strong>{shopName}</strong>
            {serviceName && <p className={styles.service}>{serviceName}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmedSheet;
