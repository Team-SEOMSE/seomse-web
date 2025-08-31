import { ReactComponent as Tag } from "../../assets/svg/tagIcon.svg";
import { useNavigate } from "react-router-dom";
import type { ButtonStyles } from "../../types/common/button";
import Button from "../common/button/Button";
import styles from "./BottomSheet.module.css";

interface BottomSheetProps {
  title: string;
  subtitle?: string;
  isBest?: boolean;
  isOpen?: boolean;
  time?: string;
  shopInfo?: string[];
  details?: string;
  onClose: () => void;
}

const STYLE: ButtonStyles = { color: "#ffffff", fontWeight: 500 };

const BottomSheet = ({
  title,
  isBest,
  isOpen,
  time,
  shopInfo,
  onClose,
}: BottomSheetProps) => {
  const navigate = useNavigate();
  const buttonElements = {
    content: "섬세한 예약하기",
    handleClick: () => {
      navigate("/user-details");
    },
  };

  return (
    <div className={`${styles.bottom_sheet} ${title ? styles.open : ""}`}>
      <div className={styles.sheet_content}>
        <button className={styles.close_button} onClick={onClose}>
          &times;
        </button>

        <div className={styles.sheet_header}>
          <div className={styles.shop_info}>
            {isBest && (
              <span className={styles.best_tag}>
                <Tag />
                재예약 BEST
              </span>
            )}
            <h2 className={styles.sheet_title}>{title}</h2>
          </div>
        </div>

        <div className={styles.shop_status}>
          {isOpen ? (
            <span className={styles.open_badge}>영업중</span>
          ) : (
            <span className={styles.closed_badge}>영업종료</span>
          )}
          {time && <span className={styles.time}>{time}</span>}
        </div>

        {shopInfo && shopInfo.length > 0 && (
          <div className={styles.shop_details}>
            <h3 className={styles.info}>매장정보</h3>
            <ul>
              {shopInfo.map((info, idx) => (
                <li key={idx}>{info}</li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.button_group}>
          <Button elements={buttonElements} style={STYLE} />
          <p className={styles.simple_book_button}>그냥 예약하기</p>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
