import { useNavigate } from "react-router-dom";
import { ReactComponent as Tag } from "../../assets/svg/tagIcon.svg";
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
  onClose: () => void;
  shopId?: string;
  designerId?: string;
  onSimpleReservation?: () => void;
  buttonElements?: {
    content: string;
    handleClick: () => void;
  };
}

const STYLE: ButtonStyles = { color: "#ffffff", fontWeight: 500 };

const BUSINESS_TIME_TEXT = "11:00 ~ 18:00";
const BUSINESS_START_MIN = 11 * 60;
const BUSINESS_END_MIN = 18 * 60;

function isShopOpenNow(date = new Date()) {
  const minutes = date.getHours() * 60 + date.getMinutes();
  return minutes >= BUSINESS_START_MIN && minutes < BUSINESS_END_MIN;
}

const BottomSheet = ({
  title,
  isBest,
  onClose,
  shopInfo,
  shopId,
  designerId,
  onSimpleReservation,
  buttonElements,
}: BottomSheetProps) => {
  const navigate = useNavigate();

  const defaultButtonElements = {
    content: "섬세한 예약하기",
    handleClick: () => {
      navigate("/select-service", {
        state: {
          reservationType: "special",
          shopName: title,
          shopId,
          designerId,
        },
      });
    },
  };

  const finalButtonElements = buttonElements || defaultButtonElements;

  const handleSimpleClick = () => {
    if (onSimpleReservation) {
      onSimpleReservation();
      return;
    }
    navigate("/select-service", {
      state: {
        reservationType: "normal",
        shopId,
        shopName: title,
        designerId,
      },
    });
  };

  const openNow = isShopOpenNow();

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.bottom_sheet} onClick={(e) => e.stopPropagation()}>
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
            {openNow ? (
              <span className={styles.open_badge}>영업중</span>
            ) : (
              <span className={styles.closed_badge}>영업종료</span>
            )}
            <span className={styles.time}>{BUSINESS_TIME_TEXT}</span>
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
            <Button elements={finalButtonElements} style={STYLE} />
            <p
              className={styles.simple_book_button}
              onClick={handleSimpleClick}
            >
              그냥 예약하기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
