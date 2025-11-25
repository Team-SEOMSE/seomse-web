import styles from "./GuideCard.module.css";

const GuideCard = () => {
    return (
        <div className={styles.box}>
            <div className={styles.title}>이런 사진이 좋아요!💕</div>
            <ul className={styles.list}>
                <li>포토샵이나 필터가 과하지 않은 사진</li>
                <li>선명한 사진</li>
                <li>정면으로 응시하고 얼굴이 잘 드러나는 사진</li>
            </ul>
        </div>
    );
};

export default GuideCard;
