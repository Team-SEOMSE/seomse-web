import Header from "../../layout/header/Header";
import Navbar from "../../layout/navbar/Navbar";
import { ReactComponent as Arrow } from "../../assets/svg/nextArrow.svg";
import styles from "./MyPage.module.css";

const MyPage = () => {
  return (
    <div className={styles.screen}>
      <Header />

      <div className={styles.booking_history}>
        <p>예약내역</p>
        <Arrow />
      </div>
      <div className={styles.logout}>
        <p>로그아웃</p>
      </div>

      <Navbar />
    </div>
  );
};

export default MyPage;
