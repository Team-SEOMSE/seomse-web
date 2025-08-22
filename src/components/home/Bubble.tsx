import styles from "./Bubble.module.css";

type BubbleProps = {
    ageGroup: string;
    userName: string;
};

const Bubble = ({ ageGroup, userName }: BubbleProps) => {
    return (
        <div className={styles.bubble}>
            {ageGroup} 여성 {userName}님이 좋아하실 스타일 추천드려요!
        </div>
    );
};

export default Bubble;
