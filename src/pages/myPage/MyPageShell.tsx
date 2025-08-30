import BackHeader from "../../layout/backHeader/BackHeader";
import { Outlet } from "react-router-dom";
import styles from "./MyPage.module.css";

export default function MyPageShell() {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <BackHeader title="마이페이지" />
      </div>
      <Outlet />
    </div>
  );
}
