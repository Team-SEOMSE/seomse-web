import MyPageSection from "../../components/myPage/myPageSection";
import Navbar from "../../layout/navbar/Navbar";
import styles from "./MyPage.module.css";

const MyPage = () => {
  return (
    <div className={styles.screen}>
      <MyPageSection />
      <Navbar />
    </div>
  );
};

export default MyPage;
