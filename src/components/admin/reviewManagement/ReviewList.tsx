import reviewImg from "../../../assets/images/reviewExample.png";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewList.module.css";

const reviews = [
    {
        rating: 4.5,
        visitDate: "2025-09-12",
        location: "준오헤어",
        stylist: "이수민",
        service: "볼륨매직+기장추가",
        content:
            "민감두피인데, 탈색할 때마다 두피 상태 고려 안 해주는 미용실이 많았는데 여기선 두피가 덜 상했어요. 뿌리 탈색도 편하게 받을 수 있었어요!",
        images: [reviewImg],
    },
    {
        rating: 5.0,
        visitDate: "2025-08-01",
        location: "디엘 청담",
        stylist: "구동현",
        service: "디자인컷",
        content:
            "디자이너님이 친절하고 머리 스타일도 마음에 들어요! 다음에도 또 방문할 예정입니다.",
        images: [],
    },
    {
        rating: 3.8,
        visitDate: "2025-07-20",
        location: "유이프 헤어",
        stylist: "고채아",
        service: "염색+클리닉",
        content:
            "염색 색감은 마음에 들지만, 머리결이 좀 상한 느낌이에요. 클리닉이 좀 더 들어갔으면 좋았을 듯...",
        images: [reviewImg, reviewImg],
    },
];

const ReviewList = () => {
    return (
        <div className={styles.section}>
            <p className={styles.title}>
                리뷰리스트 <span>n</span>건
            </p>

            {reviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
            ))}
        </div>
    );
};

export default ReviewList;
