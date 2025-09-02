import { useState } from "react";
import star from "../../../assets/svg/pinkStar.svg";
import arrow from "../../../assets/svg/upperArrow.svg";
import styles from "./ReviewCard.module.css";

type ReviewCardProps = {
    rating: number;
    visitDate: string;
    location: string;
    stylist: string;
    service: string;
    content: string;
    images?: string[];
};

const ReviewCard = ({
    rating,
    visitDate,
    location,
    stylist,
    service,
    content,
    images = [],
}: ReviewCardProps) => {
    const [is_expanded, set_is_expanded] = useState(false);

    const toggle_expanded = () => {
        set_is_expanded((prev) => !prev);
    };

    return (
        <div className={styles.review_card}>
            <div className={styles.review_header}>
                <div className={styles.rating_section}>
                    <div className={styles.star_box}>
                        <img
                            src={star}
                            alt="별점"
                            className={styles.star_icon}
                        />
                        <span className={styles.rating}>
                            {rating.toFixed(1)}
                        </span>
                    </div>
                    <span className={styles.visit_date}>
                        {visitDate} 방문 · {location}
                    </span>
                </div>

                <div className={styles.service_section}>
                    <div>
                        <span>{stylist}</span>
                        <span className={styles.devider}>|</span>
                        <span>{service}</span>
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
                    {images.length > 0 && (
                        <div className={styles.image_container}>
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`리뷰 이미지 ${idx + 1}`}
                                    className={styles.review_image}
                                />
                            ))}
                        </div>
                    )}
                    <div className={styles.text_container}>
                        <p className={styles.review_text}>{content}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewCard;
