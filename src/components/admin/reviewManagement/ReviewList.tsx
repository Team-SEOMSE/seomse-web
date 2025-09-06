import useGetApi from "../../../api/useGetApi";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewList.module.css";

interface Review {
  reviewId: string;
  reviewRating: string;
  reviewContent: string;
  reviewImage?: string;
  shopName: string;
  designerNickName: string;
  serviceName: string;
  appointmentDate: string;
}

interface ReviewsResponse {
  data: Review[];
}

const ReviewList = () => {
  const { data, isLoading } = useGetApi("reviews", "/interaction/reviews");
  const reviews: Review[] = (data as ReviewsResponse)?.data ?? [];

  return (
    <div className={styles.section}>
      <p className={styles.title}>
        리뷰리스트 <span>{reviews.length}</span>건
      </p>

      {isLoading && <p className={styles.loading}>리뷰를 불러오는 중...</p>}

      {!isLoading && reviews.length === 0 && (
        <p className={styles.empty}>등록된 리뷰가 없습니다.</p>
      )}

      {!isLoading &&
        reviews.map((review) => (
          <ReviewCard key={review.reviewId} {...review} />
        ))}
    </div>
  );
};

export default ReviewList;
