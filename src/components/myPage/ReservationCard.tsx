import { ReactComponent as Clock } from "../../assets/svg/clock.svg";
import styles from "./ReservationCard.module.css";

type Props = {
    dateTime: string;
    title: string;
    subtitle: string;
    status?: string;
    dday?: string;
    images?: string[];
    onClick?: () => void;
    showReviewButton?: boolean;
    onReviewClick?: () => void;
};

const ReservationCard = ({
    dateTime,
    title,
    subtitle,
    status,
    dday,
    images = [],
    onClick,
    showReviewButton = false,
    onReviewClick,
}: Props) => {
    return (
        <div
            className={styles.card}
            onClick={onClick}
            role={onClick ? "button" : undefined}
        >
            <div className={styles.top}>
                <Clock aria-hidden />
                <span className={styles.date_time}>{dateTime}</span>
            </div>

            <div className={styles.divider} />

            <div className={styles.info_box}>
                {images.length > 0 && (
                    <div className={styles.image_container}>
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`예약 이미지 ${idx + 1}`}
                                className={styles.reservation_image}
                            />
                        ))}
                    </div>
                )}

                <div className={styles.row1}>
                    <h3 className={styles.title}>{title}</h3>
                    <div>
                        {status && (
                            <span className={styles.badge}>{status}</span>
                        )}

                        {showReviewButton && (
                            <button
                                type="button"
                                className={styles.review_button}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onReviewClick?.();
                                }}
                            >
                                리뷰쓰기
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.row2}>
                    <p className={styles.subtitle}>{subtitle}</p>
                    {!showReviewButton && dday && (
                        <span className={styles.dday}>{dday}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReservationCard;
