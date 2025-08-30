import { ReactComponent as Complete } from "../../assets/svg/complete.svg";
import styles from "./ReviewDone.module.css";

const ReviewDone = () => {
  return (
    <div className={styles.section}>
      <Complete />
      <div className={styles.text_box}>
        <p className={styles.complete}>리뷰 작성 완료</p>
        <p className={styles.desc}>소중한 리뷰를 남겨주셔서 감사합니다.</p>
      </div>
    </div>
  );
};

export default ReviewDone;
