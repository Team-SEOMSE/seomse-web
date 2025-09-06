import { useState } from "react";
import star from "../../../assets/svg/pinkStar.svg";
import arrow from "../../../assets/svg/upperArrow.svg";
import styles from "./ReviewCard.module.css";

type ReviewCardProps = {
  reviewId: string;
  reviewRating: string;
  reviewContent: string;
  reviewImage?: string;
  shopName: string;
  designerNickName: string;
  serviceName: string;
  appointmentDate: string;
};

const normalizeUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://${url}`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ReviewCard = ({
  reviewRating,
  reviewContent,
  reviewImage,
  shopName,
  designerNickName,
  serviceName,
  appointmentDate,
}: ReviewCardProps) => {
  const [is_expanded, set_is_expanded] = useState(false);

  const toggle_expanded = () => {
    set_is_expanded((prev) => !prev);
  };

  const rating = parseFloat(reviewRating);
  const formattedDate = formatDate(appointmentDate);
  const imageUrl = normalizeUrl(reviewImage);

  return (
    <div className={styles.review_card}>
      <div className={styles.review_header}>
        <div className={styles.rating_section}>
          <div className={styles.star_box}>
            <img src={star} alt="별점" className={styles.star_icon} />
            <span className={styles.rating}>{rating.toFixed(1)}</span>
          </div>
          <span className={styles.visit_date}>
            {formattedDate} 방문 · {shopName}
          </span>
        </div>

        <div className={styles.service_section}>
          <div>
            <span>{designerNickName} 디자이너</span>
            <span className={styles.devider}>|</span>
            <span>{serviceName}</span>
          </div>
          <button
            type="button"
            className={styles.toggle_button}
            onClick={toggle_expanded}
          >
            <img
              src={arrow}
              alt="토글"
              className={`${styles.arrow_icon} ${
                is_expanded ? styles.expanded : ""
              }`}
            />
          </button>
        </div>
      </div>

      {is_expanded && (
        <div className={styles.review_content}>
          {imageUrl && (
            <div className={styles.image_container}>
              <div className={styles.image_wrapper}>
                <img
                  src={imageUrl}
                  alt="리뷰 이미지"
                  className={styles.review_image}
                />
              </div>
            </div>
          )}
          <div className={styles.text_container}>
            <p className={styles.review_text}>{reviewContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
