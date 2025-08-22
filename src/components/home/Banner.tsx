import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner_box}>
      <div className={styles.text_box}>
        <p className={styles.title}>선착순 1,000P 받기</p>
        <p className={styles.desc}>매일 밤 리뷰 작성자 선착순 포인트 지급</p>
      </div>
      <button className={styles.btn}>혜택 받기</button>
    </div>
  );
};

export default Banner;
